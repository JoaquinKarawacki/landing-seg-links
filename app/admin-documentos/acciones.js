"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { agregarDocumento, eliminarDocumento } from "@/lib/repositorioDocumentos";
import {
  claveCorrecta,
  crearValorSesion,
  DURACION_SESION_SEGUNDOS,
  NOMBRE_COOKIE_SESION,
  sesionValida,
} from "./sesion";

export async function verificarClave(formData) {
  const clave = formData.get("clave");

  if (!claveCorrecta(clave)) {
    redirect("/admin-documentos?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(NOMBRE_COOKIE_SESION, crearValorSesion(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: DURACION_SESION_SEGUNDOS,
    path: "/admin-documentos",
  });

  redirect("/admin-documentos");
}

export async function cerrarSesionAccion() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: NOMBRE_COOKIE_SESION, path: "/admin-documentos" });
  redirect("/admin-documentos");
}

async function requiereSesion() {
  const cookieStore = await cookies();
  if (!sesionValida(cookieStore.get(NOMBRE_COOKIE_SESION)?.value)) {
    redirect("/admin-documentos");
  }
}

export async function agregarDocumentoAccion(formData) {
  // Server Actions son endpoints invocables directamente: no alcanza con
  // que la página esté gateada, esta acción borra/crea archivos reales.
  await requiereSesion();

  const titulo = formData.get("titulo")?.toString().trim();
  const seccionCategoria = formData.get("seccionCategoria")?.toString() ?? "";
  const archivo = formData.get("archivo");
  const [seccion, categoria] = seccionCategoria.split("|");

  if (!titulo || !seccion || !categoria || !(archivo instanceof File) || archivo.size === 0) {
    redirect("/admin-documentos?error=1");
  }

  try {
    await agregarDocumento({ titulo, seccion, categoria, archivo });
  } catch {
    redirect("/admin-documentos?error=1");
  }

  revalidatePath("/documentos");
  revalidatePath("/admin-documentos");
  redirect("/admin-documentos?ok=1");
}

export async function eliminarDocumentoAccion(formData) {
  await requiereSesion();

  const id = formData.get("id")?.toString();
  if (id) {
    await eliminarDocumento(id);
  }

  revalidatePath("/documentos");
  revalidatePath("/admin-documentos");
  redirect("/admin-documentos");
}
