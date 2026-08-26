import IconoCategoria from "./iconos/IconoCategoria";
import IconoFlecha from "./iconos/IconoFlecha";

export default function TarjetaProyecto({ proyecto }) {
  const activo = proyecto.estado === "activo";
  const host = new URL(proyecto.url).hostname;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex flex-col items-center gap-3 bg-[#ca3517] p-6 text-center text-white">
        <IconoCategoria categoria={proyecto.categoria} className="h-10 w-10" />
        <h3 className="text-xl font-bold">{proyecto.titulo}</h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm leading-relaxed text-gray-600">
          {proyecto.descripcion}
        </p>

        <div className="mt-5 flex items-center gap-2">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${activo ? "bg-[#ca3517]" : "bg-gray-400"}`}
          />
          <span className="font-mono text-xs uppercase tracking-widest text-gray-500">
            {activo ? "Activo" : "En desarrollo"}
          </span>
        </div>

        <p className="mt-2 truncate font-mono text-[11px] text-gray-400">
          {host}
        </p>

        <a
          href={proyecto.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border-2 border-[#ca3517] px-6 py-2 text-sm font-semibold text-[#ca3517] transition-colors duration-200 hover:bg-[#ca3517] hover:text-white"
        >
          Abrir proyecto
          <span className="sr-only"> (se abre en una pestaña nueva)</span>
          <IconoFlecha className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
