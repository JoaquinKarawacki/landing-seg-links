import { createHmac, timingSafeEqual } from "node:crypto";

export const NOMBRE_COOKIE_SESION = "seg_sesion_dashboard_gerencial";

const DURACION_MS = 8 * 60 * 60 * 1000; // 8 horas
export const DURACION_SESION_SEGUNDOS = DURACION_MS / 1000;

function obtenerSecreto() {
  const secreto = process.env.CLAVE_DASHBOARD_GERENCIAL_SECRETO;
  if (!secreto) {
    throw new Error(
      "Falta configurar la variable de entorno CLAVE_DASHBOARD_GERENCIAL_SECRETO"
    );
  }
  return secreto;
}

function firmar(valor) {
  return createHmac("sha256", obtenerSecreto()).update(valor).digest("hex");
}

// Cookie de sesión firmada (sin base de datos): "expiracion.firmaHMAC"
export function crearValorSesion() {
  const expira = String(Date.now() + DURACION_MS);
  return `${expira}.${firmar(expira)}`;
}

export function sesionValida(valorCookie) {
  if (!valorCookie) return false;

  const [expira, firma] = valorCookie.split(".");
  if (!expira || !firma) return false;

  const firmaEsperada = firmar(expira);
  const bufferRecibido = Buffer.from(firma);
  const bufferEsperado = Buffer.from(firmaEsperada);
  if (bufferRecibido.length !== bufferEsperado.length) return false;
  if (!timingSafeEqual(bufferRecibido, bufferEsperado)) return false;

  return Date.now() < Number(expira);
}

// Comparación en tiempo constante: evita filtrar la clave por timing attacks.
export function claveCorrecta(claveIngresada) {
  const claveReal = process.env.CLAVE_DASHBOARD_GERENCIAL;
  if (!claveReal || typeof claveIngresada !== "string") return false;

  const bufferIngresado = Buffer.from(claveIngresada);
  const bufferReal = Buffer.from(claveReal);
  if (bufferIngresado.length !== bufferReal.length) return false;

  return timingSafeEqual(bufferIngresado, bufferReal);
}
