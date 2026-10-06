import Image from "next/image";
import Link from "next/link";
import { getUsuarioActual } from "@/lib/dal";
import { cerrarSesion } from "@/app/login/acciones";

export default async function Header() {
  const usuario = await getUsuarioActual();

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#ca3517] px-4 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-white sm:text-xs">
        Sistema interno · SEG Ingeniería
      </div>
      <div className="bg-black shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-seg.png"
              alt="SEG Ingeniería"
              width={824}
              height={828}
              className="h-10 w-10 rounded-md"
              priority
            />
            <span className="leading-tight">
              <span className="block text-sm font-bold text-white sm:text-base">
                Central de Proyectos
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-widest text-gray-400">
                SEG Ingeniería
              </span>
            </span>
          </Link>

          {usuario && (
            <div className="flex items-center gap-4">
              <span className="hidden text-xs text-gray-400 sm:inline">
                {usuario.nombre || usuario.email}
              </span>
              <Link
                href="/cambiar-password"
                className="text-xs uppercase tracking-widest text-gray-500 transition-colors duration-200 hover:text-white"
              >
                Cambiar contraseña
              </Link>
              <form action={cerrarSesion}>
                <button
                  type="submit"
                  className="text-xs uppercase tracking-widest text-gray-500 transition-colors duration-200 hover:text-[#ca3517]"
                >
                  Cerrar sesión
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
