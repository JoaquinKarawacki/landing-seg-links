import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#ca3517] px-4 py-1.5 text-center text-[11px] font-semibold uppercase tracking-widest text-white sm:text-xs">
        Sistema interno · SEG Ingeniería
      </div>
      <div className="bg-black shadow-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4">
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
        </div>
      </div>
    </header>
  );
}
