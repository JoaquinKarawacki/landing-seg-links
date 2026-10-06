import { createHmac, timingSafeEqual } from "node:crypto";

// Sesión de empleado (sin base de datos de sesiones): una cookie firmada con
// HMAC-SHA256. Mismo esquema que app/*/sesion.js, pero el payload además lleva el
// id del usuario, así sabemos QUIÉN inició sesión (no solo que hay sesión válida).
//
// Formato del valor de la cookie: "<userId>.<expira>.<firmaHMAC>"
// La firma cubre "<userId>.<expira>", así que no se puede cambiar ni el usuario ni
// la expiración sin invalidar la firma (el secreto nunca sale del server).

export const NOMBRE_COOKIE_SESION = "seg_sesion_empleado";

const DURACION_MS = 8 * 60 * 60 * 1000; // 8 horas (cubre una jornada laboral)
export const DURACION_SESION_SEGUNDOS = DURACION_MS / 1000;

function obtenerSecreto() {
  const secreto = process.env.SESION_EMPLEADOS_SECRETO;
  if (!secreto) {
    throw new Error(
      "Falta configurar la variable de entorno SESION_EMPLEADOS_SECRETO"
    );
  }
  return secreto;
}

function firmar(valor) {
  return createHmac("sha256", obtenerSecreto()).update(valor).digest("hex");
}

export function crearValorSesion(userId) {
  const expira = String(Date.now() + DURACION_MS);
  const base = `${userId}.${expira}`;
  return `${base}.${firmar(base)}`;
}

// Devuelve { userId } si la cookie es válida y no venció; null si no.
// Solo valida la firma y la expiración (chequeo rápido, sin tocar la BD). La
// confirmación de que el usuario sigue existiendo/activo la hace lib/dal.js.
export function leerSesion(valorCookie) {
  if (!valorCookie) return null;

  const partes = valorCookie.split(".");
  if (partes.length !== 3) return null;
  const [userId, expira, firma] = partes;
  if (!userId || !expira || !firma) return null;

  const firmaEsperada = firmar(`${userId}.${expira}`);
  const bufferRecibido = Buffer.from(firma);
  const bufferEsperado = Buffer.from(firmaEsperada);
  // Comparación en tiempo constante: no filtrar la firma por timing.
  if (bufferRecibido.length !== bufferEsperado.length) return null;
  if (!timingSafeEqual(bufferRecibido, bufferEsperado)) return null;

  if (Date.now() >= Number(expira)) return null;

  return { userId };
}
