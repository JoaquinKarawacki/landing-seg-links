import { getUsuarioActual } from "@/lib/dal";
import { cambiarPasswordAccion } from "./acciones";

export const metadata = {
  title: "Cambiar contraseña · SEG Ingeniería",
  robots: { index: false, follow: false },
};

const MENSAJES_ERROR = {
  corta: "La nueva contraseña debe tener al menos 8 caracteres.",
  confirmacion: "La nueva contraseña y su confirmación no coinciden.",
  igual: "La nueva contraseña no puede ser igual a la actual.",
  actual: "La contraseña actual es incorrecta.",
};

export default async function PaginaCambiarPassword({ searchParams }) {
  const usuario = await getUsuarioActual();
  const parametros = await searchParams;
  const error = parametros?.error;
  const ok = parametros?.ok === "1";

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-bold text-gray-900">Cambiar contraseña</h1>
        <div className="mt-2 h-1 w-16 rounded bg-[#ca3517]" />
        {usuario && (
          <p className="mt-3 text-sm text-gray-500">
            Sesión de {usuario.nombre || usuario.email}.
          </p>
        )}

        {ok && (
          <p className="mt-6 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
            Contraseña actualizada correctamente.
          </p>
        )}
        {error && MENSAJES_ERROR[error] && (
          <p className="mt-6 rounded-lg bg-[#ca3517]/10 px-4 py-3 text-sm text-[#ca3517]">
            {MENSAJES_ERROR[error]}
          </p>
        )}

        <form action={cambiarPasswordAccion} className="mt-8 space-y-5">
          <div>
            <label htmlFor="actual" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Contraseña actual
            </label>
            <input
              id="actual"
              name="actual"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="nueva" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Nueva contraseña (mín. 8)
            </label>
            <input
              id="nueva"
              name="nueva"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="confirmar" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Repetir nueva contraseña
            </label>
            <input
              id="confirmar"
              name="confirmar"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </section>
  );
}
