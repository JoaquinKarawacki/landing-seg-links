import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { leerSesion, NOMBRE_COOKIE_SESION } from "./sesionEmpleado.js";
import { obtenerPorId } from "./repositorioUsuarios.js";

// Data Access Layer (DAL): punto único de verificación "segura" de la sesión.
// A diferencia del proxy (chequeo optimista, solo firma de la cookie), acá
// además se confirma contra la BD que el usuario existe y sigue activo. Así,
// desactivar a alguien lo saca aunque su cookie siga sin vencer.
//
// Se envuelve con cache() de React para que, dentro de un mismo render/request,
// no se repita la lectura de cookie + consulta a la BD si se llama varias veces.

// Devuelve el usuario actual (DTO) o null. No redirige: útil para UI que cambia
// según haya o no sesión (ej. el botón de cerrar sesión en el Header).
export const getUsuarioActual = cache(async () => {
  const cookieStore = await cookies();
  const sesion = leerSesion(cookieStore.get(NOMBRE_COOKIE_SESION)?.value);
  if (!sesion) return null;

  const usuario = obtenerPorId(sesion.userId);
  if (!usuario || !usuario.activo) return null;

  return usuario;
});

// Exige sesión válida: si no hay, redirige a /login. Devuelve el usuario.
// Usar en Server Actions y Route Handlers que requieren empleado autenticado.
export const verifySession = cache(async () => {
  const usuario = await getUsuarioActual();
  if (!usuario) {
    redirect("/login");
  }
  return usuario;
});
