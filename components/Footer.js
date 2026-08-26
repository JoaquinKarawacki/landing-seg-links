import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] py-10 text-gray-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="flex items-center gap-3">
          <Image
            src="/logo-seg.png"
            alt="SEG Ingeniería"
            width={824}
            height={828}
            className="h-8 w-8 rounded"
          />
          <div>
            <p className="text-sm font-semibold text-white">SEG Ingeniería</p>
            <p className="text-[11px] font-medium uppercase tracking-widest text-gray-500">
              Central de proyectos
            </p>
          </div>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-gray-500">
          Directorio interno de los sistemas, dashboards y herramientas
          desarrollados para SEG Ingeniería. Uso exclusivo del equipo.
        </p>
      </div>
    </footer>
  );
}
