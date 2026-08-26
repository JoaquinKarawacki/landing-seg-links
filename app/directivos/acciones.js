"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  claveCorrecta,
  crearValorSesion,
  DURACION_SESION_SEGUNDOS,
  NOMBRE_COOKIE_SESION,
} from "./sesion";

export async function verificarClave(formData) {
  const clave = formData.get("clave");

  if (!claveCorrecta(clave)) {
    redirect("/directivos?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(NOMBRE_COOKIE_SESION, crearValorSesion(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DURACION_SESION_SEGUNDOS,
    path: "/directivos",
  });

  redirect("/directivos");
}

export async function cerrarSesionAccion() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: NOMBRE_COOKIE_SESION, path: "/directivos" });
  redirect("/directivos");
}
