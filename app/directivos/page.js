import { cookies } from "next/headers";
import FormularioClave from "@/components/FormularioClave";
import IconoCandado from "@/components/iconos/IconoCandado";
import IconoFlecha from "@/components/iconos/IconoFlecha";
import { URL_CMI_DASHBOARD } from "@/datos/enlaces-restringidos";
import { cerrarSesionAccion, verificarClave } from "./acciones";
import { NOMBRE_COOKIE_SESION, sesionValida } from "./sesion";

export const metadata = {
  title: "Acceso restringido · SEG Ingeniería",
  robots: { index: false, follow: false },
};

export default async function PaginaDirectivos({ searchParams }) {
  const cookieStore = await cookies();
  const autenticado = sesionValida(cookieStore.get(NOMBRE_COOKIE_SESION)?.value);
  const parametros = await searchParams;
  const conError = parametros?.error === "1";

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-4 py-20">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <IconoCandado className="h-12 w-12 text-[#ca3517]" />

        {autenticado ? (
          <>
            <h1 className="mt-6 text-3xl font-bold text-white">Panel directivo</h1>
            <p className="mt-3 text-sm text-gray-400">
              Acceso exclusivo para gerencia general y directores.
            </p>

            <a
              href={URL_CMI_DASHBOARD}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
            >
              Abrir CMI Dashboard
              <span className="sr-only"> (se abre en una pestaña nueva)</span>
              <IconoFlecha className="h-3.5 w-3.5" />
            </a>

            <form action={cerrarSesionAccion} className="mt-10">
              <button
                type="submit"
                className="text-xs uppercase tracking-widest text-gray-500 transition-colors duration-200 hover:text-gray-300"
              >
                Cerrar sesión
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="mt-6 text-3xl font-bold text-white">Acceso restringido</h1>
            <p className="mb-8 mt-3 text-sm text-gray-400">
              Esta sección es exclusiva para gerencia general y directores.
            </p>
            <FormularioClave accion={verificarClave} error={conError} />
          </>
        )}
      </div>
    </section>
  );
}
