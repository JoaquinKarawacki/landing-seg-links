// Carga/actualiza usuarios en la base del login desde un CSV, con una contraseña
// compartida para todos (temporal: la idea es que después cada uno la cambie).
// Es idempotente (upsert por email): correrlo dos veces no duplica.
//
// Uso:
//   node scripts/cargar-usuarios.js usuarios.csv "<contraseña-compartida>"
//   npm run cargar-usuarios -- usuarios.csv "<contraseña-compartida>"
//
// CSV esperado (con encabezado): email,nombre,rol[,sector]
//   (la columna sector, si está, se ignora)
//
// El usuarios.csv se genera desde la BD de Licencias (fuente de verdad).
//
// La ruta del .db sale de RUTA_BASE_DATOS (igual que la app). En local, si no está
// seteada, usa ./almacenamiento/usuarios.db. En producción (Railway) el Volumen
// vive dentro del contenedor: correr este script ahí (railway ssh) o cargar los
// usuarios desde el panel de administración.

import { readFileSync } from "node:fs";
import { upsertUsuario } from "../lib/repositorioUsuarios.js";

const archivo = process.argv[2];
const passwordCompartida = process.argv[3];

if (!archivo || !passwordCompartida) {
  console.error(
    'Uso: node scripts/cargar-usuarios.js usuarios.csv "<contraseña-compartida>"'
  );
  process.exit(1);
}

// Parser CSV mínimo que respeta comillas (por si un nombre trae coma).
function parsearLinea(linea) {
  const campos = [];
  let actual = "";
  let enComillas = false;
  for (let i = 0; i < linea.length; i++) {
    const c = linea[i];
    if (enComillas) {
      if (c === '"' && linea[i + 1] === '"') {
        actual += '"';
        i++;
      } else if (c === '"') {
        enComillas = false;
      } else {
        actual += c;
      }
    } else if (c === '"') {
      enComillas = true;
    } else if (c === ",") {
      campos.push(actual);
      actual = "";
    } else {
      actual += c;
    }
  }
  campos.push(actual);
  return campos.map((v) => v.trim());
}

let contenido;
try {
  contenido = readFileSync(archivo, "utf-8");
} catch (error) {
  console.error(`No se pudo leer "${archivo}": ${error.message}`);
  process.exit(1);
}

const lineas = contenido
  .split(/\r?\n/)
  .map((l) => l.trim())
  .filter(Boolean);

if (lineas.length === 0) {
  console.error("El CSV está vacío.");
  process.exit(1);
}

// Mapear columnas por nombre del encabezado.
const encabezado = parsearLinea(lineas[0]).map((h) => h.toLowerCase());
const idxEmail = encabezado.indexOf("email");
const idxNombre = encabezado.indexOf("nombre");
const idxRol = encabezado.indexOf("rol");
if (idxEmail === -1) {
  console.error('El CSV debe tener una columna "email" en el encabezado.');
  process.exit(1);
}

let creados = 0;
let actualizados = 0;
let errores = 0;

for (const linea of lineas.slice(1)) {
  const campos = parsearLinea(linea);
  const email = campos[idxEmail];
  const nombre = idxNombre !== -1 ? campos[idxNombre] : "";
  const rol = idxRol !== -1 ? campos[idxRol] || "empleado" : "empleado";

  if (!email) {
    console.error(`Línea sin email, salteada: ${linea}`);
    errores++;
    continue;
  }

  try {
    const resultado = upsertUsuario({
      email,
      nombre,
      password: passwordCompartida,
      rol,
    });
    if (resultado.actualizado) {
      actualizados++;
      console.log(`↻ actualizado: ${email}`);
    } else {
      creados++;
      console.log(`✓ creado:      ${email}`);
    }
  } catch (error) {
    errores++;
    console.error(`✗ ${email}: ${error.message}`);
  }
}

console.log(
  `\nListo. Creados: ${creados} · Actualizados: ${actualizados} · Errores: ${errores}`
);
process.exit(errores > 0 ? 1 : 0);
