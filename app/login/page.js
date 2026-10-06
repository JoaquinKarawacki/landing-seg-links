import { redirect } from "next/navigation";
import Image from "next/image";
import { getUsuarioActual } from "@/lib/dal";
import { iniciarSesion } from "./acciones";

export const metadata = {
  title: "Ingresar · SEG Ingeniería",
  robots: { index: false, follow: false },
};

export default async function PaginaLogin({ searchParams }) {
  // Si ya hay sesión válida, no mostrar el login: ir directo a la home.
  const usuario = await getUsuarioActual();
  if (usuario) {
    redirect("/");
  }

  const parametros = await searchParams;
  const error = parametros?.error;
  const minutos = parametros?.minutos;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-black px-4 py-20">
      <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
        <Image
          src="/logo-seg.png"
          alt="SEG Ingeniería"
          width={824}
          height={828}
          className="h-14 w-14 rounded-md"
          priority
        />
        <h1 className="mt-6 text-3xl font-bold text-white">Central de Proyectos</h1>
        <p className="mb-8 mt-3 text-sm text-gray-400">
          Acceso exclusivo para empleados de SEG Ingeniería.
        </p>

        <form action={iniciarSesion} className="w-full">
          <label
            htmlFor="email"
            className="mb-2 block text-left text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoFocus
            autoComplete="username"
            className="mb-4 w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#ca3517] focus:outline-none"
            placeholder="nombre@segingenieria.com"
          />

          <label
            htmlFor="password"
            className="mb-2 block text-left text-xs font-semibold uppercase tracking-widest text-gray-400"
          >
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#ca3517] focus:outline-none"
            placeholder="••••••••"
          />

          {error === "credenciales" && (
            <p className="mt-3 text-left text-sm text-[#ca3517]">
              Email o contraseña incorrectos.
            </p>
          )}
          {error === "bloqueado" && (
            <p className="mt-3 text-left text-sm text-[#ca3517]">
              Demasiados intentos fallidos. Probá de nuevo en {minutos || 15}{" "}
              minuto{Number(minutos) === 1 ? "" : "s"}.
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
          >
            Ingresar
          </button>
        </form>
      </div>
    </section>
  );
}
