import Link from "next/link";
import IconoFlechaAtras from "./iconos/IconoFlechaAtras";

const SOMBRA_TEXTO = { textShadow: "0 2px 16px rgba(0,0,0,0.65)" };

export default function Hero({
  volverHref,
  volverLabel = "Volver",
  etiqueta = "SEG Ingeniería · Sistema interno",
  titulo = (
    <>
      Todos los sistemas de SEG,
      <br className="hidden sm:block" /> en un solo lugar.
    </>
  ),
  subtitulo = "Dashboards, herramientas y sistemas de gestión desarrollados para la empresa, centralizados para que todo el equipo los encuentre en segundos.",
  ctaHref = "#proyectos",
  ctaLabel = "Ver proyectos",
  estadisticaValor,
  estadisticaLabel,
  anclaScroll = "#proyectos",
  anclaScrollEtiqueta = "Ir a la lista de proyectos",
}) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-start px-4 py-28 sm:py-32">
        {volverHref && (
          <Link
            href={volverHref}
            className="animar-entrada mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-300 transition-colors duration-200 hover:text-white"
            style={{ animationDelay: "0s" }}
          >
            <IconoFlechaAtras className="h-3.5 w-3.5" />
            {volverLabel}
          </Link>
        )}

        <p
          className="animar-entrada text-xs font-bold uppercase tracking-[0.3em] text-[#ca3517]"
          style={{ ...SOMBRA_TEXTO, animationDelay: "0.05s" }}
        >
          {etiqueta}
        </p>

        <h1
          className="animar-entrada mt-5 text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ ...SOMBRA_TEXTO, animationDelay: "0.15s" }}
        >
          {titulo}
        </h1>

        <p
          className="animar-entrada mt-6 max-w-xl text-lg font-light text-gray-100 sm:text-xl"
          style={{ ...SOMBRA_TEXTO, animationDelay: "0.3s" }}
        >
          {subtitulo}
        </p>

        <div
          className="animar-entrada mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href={ctaHref}
            className="inline-block rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
          >
            {ctaLabel}
          </a>

          {estadisticaValor !== undefined && (
            <div
              className="flex items-baseline gap-2 border-l-2 border-white/30 pl-6"
              style={SOMBRA_TEXTO}
            >
              <span className="text-4xl font-black text-white sm:text-5xl">
                {estadisticaValor}
              </span>
              <span className="text-sm text-gray-100">
                {estadisticaLabel}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <a
          href={anclaScroll}
          aria-label={anclaScrollEtiqueta}
          className="animate-bounce text-white/70 transition-colors duration-200 hover:text-white"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              d="M6 9l6 6 6-6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
