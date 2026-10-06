import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { obtenerDb } from "./baseDatos.js";

// Único responsable de los usuarios: altas, consultas, verificación de
// credenciales y el rate limit de login. No sabe de sesiones/cookies (eso es
// lib/sesionEmpleado.js) ni de dónde vive físicamente la base (eso es
// lib/baseDatos.js). Junto a baseDatos.js es lo único que habría que reescribir
// para migrar a otro motor de BD.

// --- Rate limit de login ---
const MAX_INTENTOS = 5; // fallos seguidos antes de bloquear
const BLOQUEO_MS = 15 * 60 * 1000; // 15 min de bloqueo tras agotar los intentos

// --- Hashing de contraseñas (scrypt, de node:crypto, sin dependencias nuevas) ---
// Formato guardado: "scrypt$<salt_hex>$<hash_hex>". Nunca se guarda la contraseña
// en texto plano. El hash es irreversible: para verificar un login se vuelve a
// hashear la contraseña tipeada con el MISMO salt guardado y se comparan los hashes.
const LARGO_HASH = 64;

function hashearPassword(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, LARGO_HASH);
  return `scrypt$${salt.toString("hex")}$${hash.toString("hex")}`;
}

function passwordCoincide(password, almacenado) {
  if (typeof almacenado !== "string") return false;
  const [algoritmo, saltHex, hashHex] = almacenado.split("$");
  if (algoritmo !== "scrypt" || !saltHex || !hashHex) return false;

  const hashEsperado = Buffer.from(hashHex, "hex");
  // Mismo salt que se usó al registrar → reproduce exactamente el mismo cálculo.
  const hashCalculado = scryptSync(password, Buffer.from(saltHex, "hex"), hashEsperado.length);
  // Comparación en tiempo constante: no filtrar info por timing.
  return (
    hashEsperado.length === hashCalculado.length &&
    timingSafeEqual(hashEsperado, hashCalculado)
  );
}

// --- DTO: nunca devolver el hash de la contraseña fuera de este archivo ---
function aDto(fila) {
  if (!fila) return null;
  return {
    id: fila.id,
    email: fila.email,
    nombre: fila.nombre,
    rol: fila.rol,
    activo: fila.activo === 1,
    bloqueadoHasta: fila.bloqueado_hasta,
    bloqueado: fila.bloqueado_hasta
      ? Date.parse(fila.bloqueado_hasta) > Date.now()
      : false,
    creadoEn: fila.creado_en,
    actualizadoEn: fila.actualizado_en,
  };
}

function normalizarEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

// --- Operaciones ---

export function crearUsuario({ email, nombre, password, rol = "empleado" }) {
  const correo = normalizarEmail(email);
  if (!correo) throw new Error("El email es obligatorio.");
  if (!password || String(password).length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }

  const db = obtenerDb();
  const ahora = new Date().toISOString();
  const usuario = {
    id: randomUUID(),
    email: correo,
    nombre: nombre?.toString().trim() || null,
    hash_password: hashearPassword(String(password)),
    rol,
    activo: 1,
    creado_en: ahora,
    actualizado_en: ahora,
  };

  try {
    db.prepare(
      `INSERT INTO usuarios
         (id, email, nombre, hash_password, rol, activo, creado_en, actualizado_en)
       VALUES
         (?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      usuario.id,
      usuario.email,
      usuario.nombre,
      usuario.hash_password,
      usuario.rol,
      usuario.activo,
      usuario.creado_en,
      usuario.actualizado_en
    );
  } catch (error) {
    // Violación del índice único de email.
    if (String(error.message).includes("UNIQUE")) {
      throw new Error(`Ya existe un usuario con el email ${correo}.`);
    }
    throw error;
  }

  return aDto(usuario);
}

export function obtenerPorId(id) {
  const db = obtenerDb();
  return aDto(db.prepare("SELECT * FROM usuarios WHERE id = ?").get(id));
}

export function buscarPorEmail(email) {
  const db = obtenerDb();
  return aDto(db.prepare("SELECT * FROM usuarios WHERE email = ?").get(normalizarEmail(email)));
}

// Intento de login con rate limit. Devuelve uno de:
//   { ok: true,  usuario }
//   { ok: false, motivo: "bloqueado",    esperaSegundos }
//   { ok: false, motivo: "credenciales", intentosRestantes }
//
// No distingue "email no existe" de "contraseña incorrecta" (ambos → credenciales)
// para no filtrar qué emails están registrados.
export function intentarLogin(email, password) {
  const db = obtenerDb();
  const fila = db.prepare("SELECT * FROM usuarios WHERE email = ?").get(normalizarEmail(email));

  if (!fila || fila.activo !== 1) {
    return { ok: false, motivo: "credenciales", intentosRestantes: MAX_INTENTOS };
  }

  // ¿La cuenta está bloqueada por intentos previos? (desbloqueo perezoso: si la
  // fecha ya pasó, el if no entra y seguimos de largo — no hace falta un scheduler)
  if (fila.bloqueado_hasta) {
    const hasta = Date.parse(fila.bloqueado_hasta);
    if (Date.now() < hasta) {
      return {
        ok: false,
        motivo: "bloqueado",
        esperaSegundos: Math.ceil((hasta - Date.now()) / 1000),
      };
    }
  }

  const ahora = new Date().toISOString();

  if (passwordCoincide(String(password ?? ""), fila.hash_password)) {
    // Login correcto → resetear el contador y limpiar el bloqueo.
    db.prepare(
      "UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL, actualizado_en = ? WHERE id = ?"
    ).run(ahora, fila.id);
    return { ok: true, usuario: aDto(fila) };
  }

  // Login incorrecto → sumar un intento y, si se agotaron, bloquear.
  const intentos = fila.intentos_fallidos + 1;
  if (intentos >= MAX_INTENTOS) {
    const bloqueadoHasta = new Date(Date.now() + BLOQUEO_MS).toISOString();
    // Reseteo el contador a 0: al vencer el bloqueo vuelve a tener los 5 intentos.
    db.prepare(
      "UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = ?, actualizado_en = ? WHERE id = ?"
    ).run(bloqueadoHasta, ahora, fila.id);
    return { ok: false, motivo: "bloqueado", esperaSegundos: Math.ceil(BLOQUEO_MS / 1000) };
  }

  db.prepare(
    "UPDATE usuarios SET intentos_fallidos = ?, actualizado_en = ? WHERE id = ?"
  ).run(intentos, ahora, fila.id);
  return { ok: false, motivo: "credenciales", intentosRestantes: MAX_INTENTOS - intentos };
}

export function listarUsuarios() {
  const db = obtenerDb();
  return db
    .prepare("SELECT * FROM usuarios ORDER BY activo DESC, email ASC")
    .all()
    .map(aDto);
}

// Verifica la contraseña actual de un usuario por id (para el cambio self-service).
export function verificarPasswordDeUsuario(id, password) {
  const db = obtenerDb();
  const fila = db.prepare("SELECT hash_password FROM usuarios WHERE id = ?").get(id);
  if (!fila) return false;
  return passwordCoincide(String(password ?? ""), fila.hash_password);
}

export function cambiarPassword(id, nuevaPassword) {
  if (!nuevaPassword || String(nuevaPassword).length < 8) {
    throw new Error("La contraseña debe tener al menos 8 caracteres.");
  }
  const db = obtenerDb();
  db.prepare(
    "UPDATE usuarios SET hash_password = ?, intentos_fallidos = 0, bloqueado_hasta = NULL, actualizado_en = ? WHERE id = ?"
  ).run(hashearPassword(String(nuevaPassword)), new Date().toISOString(), id);
}

export function activarDesactivar(id, activo) {
  const db = obtenerDb();
  db.prepare("UPDATE usuarios SET activo = ?, actualizado_en = ? WHERE id = ?").run(
    activo ? 1 : 0,
    new Date().toISOString(),
    id
  );
}

export function eliminarUsuario(id) {
  const db = obtenerDb();
  db.prepare("DELETE FROM usuarios WHERE id = ?").run(id);
}

// Desbloquea manualmente una cuenta (para el panel de administración).
export function desbloquear(id) {
  const db = obtenerDb();
  db.prepare(
    "UPDATE usuarios SET intentos_fallidos = 0, bloqueado_hasta = NULL, actualizado_en = ? WHERE id = ?"
  ).run(new Date().toISOString(), id);
}

// Upsert por email: usado por el script de carga inicial para poder correrlo
// varias veces sin duplicar (actualiza nombre y contraseña si el email ya existe).
export function upsertUsuario({ email, nombre, password, rol = "empleado" }) {
  const existente = buscarPorEmail(email);
  if (!existente) {
    return crearUsuario({ email, nombre, password, rol });
  }
  const db = obtenerDb();
  db.prepare(
    "UPDATE usuarios SET nombre = ?, hash_password = ?, actualizado_en = ? WHERE id = ?"
  ).run(
    nombre?.toString().trim() || existente.nombre,
    hashearPassword(String(password)),
    new Date().toISOString(),
    existente.id
  );
  return { ...existente, actualizado: true };
}
