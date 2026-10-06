"use server";

import { redirect } from "next/navigation";
import { getUsuarioActual } from "@/lib/dal";
import {
  cambiarPassword,
  verificarPasswordDeUsuario,
} from "@/lib/repositorioUsuarios";

export async function cambiarPasswordAccion(formData) {
  // Verificar sesión: solo el propio usuario logueado puede cambiar su clave.
  const usuario = await getUsuarioActual();
  if (!usuario) {
    redirect("/login");
  }

  const actual = formData.get("actual")?.toString() ?? "";
  const nueva = formData.get("nueva")?.toString() ?? "";
  const confirmar = formData.get("confirmar")?.toString() ?? "";

  if (nueva.length < 8) {
    redirect("/cambiar-password?error=corta");
  }
  if (nueva !== confirmar) {
    redirect("/cambiar-password?error=confirmacion");
  }
  if (nueva === actual) {
    redirect("/cambiar-password?error=igual");
  }
  if (!verificarPasswordDeUsuario(usuario.id, actual)) {
    redirect("/cambiar-password?error=actual");
  }

  cambiarPassword(usuario.id, nueva);
  redirect("/cambiar-password?ok=1");
}
