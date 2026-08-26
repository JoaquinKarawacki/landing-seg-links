import Link from "next/link";
import IconoCandado from "./iconos/IconoCandado";
import IconoLupa from "./iconos/IconoLupa";

export default function BarraFiltros({
  categorias,
  categoriaActiva,
  onCategoriaChange,
  busqueda,
  onBusquedaChange,
  conteos,
}) {
  return (
    <div className="sticky top-[92px] z-40 border-b border-gray-200 bg-gray-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap gap-2">
          {categorias.map((categoria) => {
            const activa = categoria === categoriaActiva;
            return (
              <button
                key={categoria}
                type="button"
                aria-pressed={activa}
                onClick={() => onCategoriaChange(categoria)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activa
                    ? "bg-[#ca3517] text-white"
                    : "border border-gray-200 bg-white text-gray-600 hover:border-[#ca3517] hover:text-[#ca3517]"
                }`}
              >
                {categoria}
                <span className="ml-1.5 text-xs font-semibold opacity-70">
                  {conteos[categoria] ?? 0}
                </span>
              </button>
            );
          })}

          <Link
            href="/dashboard-gerencial"
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm font-medium text-gray-600 transition-colors duration-200 hover:border-[#ca3517] hover:text-[#ca3517]"
          >
            <IconoCandado className="h-3.5 w-3.5" />
            Dashboard Gerencial
          </Link>
        </div>

        <label className="relative w-full sm:w-64">
          <span className="sr-only">Buscar proyecto</span>
          <IconoLupa className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={busqueda}
            onChange={(evento) => onBusquedaChange(evento.target.value)}
            placeholder="Buscar proyecto..."
            className="w-full rounded-full border border-gray-200 bg-white py-1.5 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:border-[#ca3517] focus:outline-none"
          />
        </label>
      </div>
    </div>
  );
}
