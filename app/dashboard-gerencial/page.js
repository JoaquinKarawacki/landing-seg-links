import { cookies } from "next/headers";
import FormularioClave from "@/components/FormularioClave";
import IconoCandado from "@/components/iconos/IconoCandado";
import TarjetaProyecto from "@/components/TarjetaProyecto";
import { URL_CMI_DASHBOARD } from "@/datos/enlaces-restringidos";
import { cerrarSesionAccion, verificarClave } from "./acciones";
import { NOMBRE_COOKIE_SESION, sesionValida } from "./sesion";

const PROYECTO_DASHBOARD_GERENCIAL = {
  id: "dashboard-gerencial",
  titulo: "Dashboard Gerencial",
  descripcion: "Indicadores clave de gestión para gerencia.",
  url: URL_CMI_DASHBOARD,
  categoria: "Dashboards",
  estado: "activo",
};

export const metadata = {
  title: "Acceso restringido · SEG Ingeniería",
  robots: { index: false, follow: false },
};

export default async function PaginaDashboardGerencial({ searchParams }) {
  const cookieStore = await cookies();
  const autenticado = sesionValida(cookieStore.get(NOMBRE_COOKIE_SESION)?.value);
  const parametros = await searchParams;
  const conError = parametros?.error === "1";

  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-4 py-20">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />

      {autenticado ? (
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
          <TarjetaProyecto proyecto={PROYECTO_DASHBOARD_GERENCIAL} />

          <form action={cerrarSesionAccion} className="mt-10">
            <button
              type="submit"
              className="text-xs uppercase tracking-widest text-gray-500 transition-colors duration-200 hover:text-gray-300"
            >
              Cerrar sesión
            </button>
          </form>
        </div>
      ) : (
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
          <IconoCandado className="h-12 w-12 text-[#ca3517]" />
          <h1 className="mt-6 text-3xl font-bold text-white">Acceso restringido</h1>
          <p className="mb-8 mt-3 text-sm text-gray-400">
            El Dashboard Gerencial es exclusivo para gerencia.
          </p>
          <FormularioClave accion={verificarClave} error={conError} />
        </div>
      )}
    </section>
  );
}
