"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  crearValorSesion,
  DURACION_SESION_SEGUNDOS,
  NOMBRE_COOKIE_SESION,
} from "@/lib/sesionEmpleado";
import { intentarLogin } from "@/lib/repositorioUsuarios";

export async function iniciarSesion(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const resultado = intentarLogin(email, password);

  if (!resultado.ok) {
    if (resultado.motivo === "bloqueado") {
      const minutos = Math.ceil(resultado.esperaSegundos / 60);
      redirect(`/login?error=bloqueado&minutos=${minutos}`);
    }
    redirect("/login?error=credenciales");
  }

  const cookieStore = await cookies();
  cookieStore.set(NOMBRE_COOKIE_SESION, crearValorSesion(resultado.usuario.id), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DURACION_SESION_SEGUNDOS,
    path: "/",
  });

  redirect("/");
}

export async function cerrarSesion() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: NOMBRE_COOKIE_SESION, path: "/" });
  redirect("/login");
}
