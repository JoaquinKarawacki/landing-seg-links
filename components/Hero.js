import { PROYECTOS } from "@/datos/proyectos";

const SOMBRA_TEXTO = { textShadow: "0 2px 16px rgba(0,0,0,0.65)" };

export default function Hero() {
  const total = PROYECTOS.length;
  const activos = PROYECTOS.filter((proyecto) => proyecto.estado === "activo").length;

  return (
    <section className="relative overflow-hidden bg-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      {/* Sin oscurecer el video: la legibilidad del texto la da la sombra de texto, no un velo. */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
      <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-start px-4 py-28 sm:py-32">
        <p
          className="animar-entrada text-xs font-bold uppercase tracking-[0.3em] text-[#ca3517]"
          style={{ ...SOMBRA_TEXTO, animationDelay: "0.05s" }}
        >
          SEG Ingeniería · Sistema interno
        </p>

        <h1
          className="animar-entrada mt-5 text-3xl font-bold leading-[1.1] text-white sm:text-4xl md:text-5xl lg:text-6xl"
          style={{ ...SOMBRA_TEXTO, animationDelay: "0.15s" }}
        >
          Todos los sistemas de SEG,
          <br className="hidden sm:block" /> en un solo lugar.
        </h1>

        <p
          className="animar-entrada mt-6 max-w-xl text-lg font-light text-gray-100 sm:text-xl"
          style={{ ...SOMBRA_TEXTO, animationDelay: "0.3s" }}
        >
          Dashboards, herramientas y sistemas de gestión desarrollados para
          la empresa, centralizados para que todo el equipo los encuentre en
          segundos.
        </p>

        <div
          className="animar-entrada mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
          style={{ animationDelay: "0.45s" }}
        >
          <a
            href="#proyectos"
            className="inline-block rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
          >
            Ver proyectos
          </a>

          <div
            className="flex items-baseline gap-2 border-l-2 border-white/30 pl-6"
            style={SOMBRA_TEXTO}
          >
            <span className="text-4xl font-black text-white sm:text-5xl">
              {total}
            </span>
            <span className="text-sm text-gray-100">
              sistemas · {activos} activos
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <a
          href="#proyectos"
          aria-label="Ir a la lista de proyectos"
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
