import { NextResponse } from "next/server";
import { leerSesion, NOMBRE_COOKIE_SESION } from "@/lib/sesionEmpleado";

// Gateo de TODO el sitio (chequeo optimista, antes de renderizar nada).
// En Next 16 el middleware se llama "proxy". Acá solo validamos la FIRMA de la
// cookie de sesión (rápido, sin tocar la BD); la verificación "segura" contra la
// BD (usuario activo) la hace lib/dal.js en las páginas/acciones sensibles.
//
// Rutas públicas: solo /login (y sus assets). Todo lo demás exige sesión.
const RUTAS_PUBLICAS = ["/login"];

export default function proxy(request) {
  const { pathname } = request.nextUrl;

  const esPublica = RUTAS_PUBLICAS.some(
    (ruta) => pathname === ruta || pathname.startsWith(`${ruta}/`)
  );

  const sesion = leerSesion(request.cookies.get(NOMBRE_COOKIE_SESION)?.value);

  // Sin sesión y ruta privada → al login.
  if (!sesion && !esPublica) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // Con sesión entrando al login → mandarlo a la home (ya está adentro).
  if (sesion && esPublica) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// No correr el proxy sobre assets internos ni archivos estáticos de /public
// (logo, favicon, íconos). Sí sobre todo el resto, incluidas las descargas de
// documentos (/documentos/archivo/[id]).
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|logo-seg.png|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp)$).*)",
  ],
};
