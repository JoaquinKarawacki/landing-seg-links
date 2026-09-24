import Link from "next/link";
import Hero from "@/components/Hero";
import IconoCapitalHumano from "@/components/iconos/IconoCapitalHumano";
import IconoFlecha from "@/components/iconos/IconoFlecha";
import ListadoDocumentos from "@/components/ListadoDocumentos";
import {
  CATEGORIAS_CAPITAL_HUMANO,
  CATEGORIAS_DOC_PERSONAL_EN_CAPITAL_HUMANO,
} from "@/datos/documentos";
import { listarDocumentos } from "@/lib/repositorioDocumentos";

// Mismo motivo que /documentos: los archivos viven en el volumen, que no
// existe en build-time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Capital humano · SEG Ingeniería",
  description:
    "Cédulas, carnés de salud, organigrama, cumpleaños y contactos de emergencia del equipo de SEG Ingeniería.",
};

const ICONOS_SECCION = {
  "Capital humano": IconoCapitalHumano,
};

// Categorías que se muestran en esta página (las cédulas y carnés viven en la
// misma sección "Capital humano" del índice, pero se muestran aparte).
const CATEGORIAS_VISIBLES = CATEGORIAS_CAPITAL_HUMANO["Capital humano"];

export default async function PaginaCapitalHumano() {
  const documentosPersistidos = await listarDocumentos();
  const DOCUMENTOS = documentosPersistidos
    .filter(
      (documento) =>
        Object.hasOwn(CATEGORIAS_CAPITAL_HUMANO, documento.seccion) &&
        CATEGORIAS_VISIBLES.includes(documento.categoria)
    )
    .map((documento) => ({
      ...documento,
      archivo: `/documentos/archivo/${documento.id}`,
    }));

  // Cantidad de documentación personal (cédulas + carnés) para mostrar en el
  // link a la página aparte.
  const cantidadDocPersonal = documentosPersistidos.filter(
    (documento) =>
      documento.seccion === "Capital humano" &&
      CATEGORIAS_DOC_PERSONAL_EN_CAPITAL_HUMANO.includes(documento.categoria)
  ).length;

  return (
    <>
      <Hero
        volverHref="/"
        volverLabel="Volver a Proyectos"
        titulo={
          <>
            Todo el equipo de SEG,
            <br className="hidden sm:block" /> en un solo lugar.
          </>
        }
        subtitulo="Cédulas, carnés de salud, organigrama, cumpleaños y contactos de emergencia, centralizados para todo el equipo."
        ctaHref="#capital-humano"
        ctaLabel="Ver documentos"
        estadisticaValor={DOCUMENTOS.length}
        estadisticaLabel="documentos disponibles"
        anclaScroll="#capital-humano"
        anclaScrollEtiqueta="Ir a la lista de documentos de Capital humano"
      />

      <ListadoDocumentos
        categorias={CATEGORIAS_CAPITAL_HUMANO}
        documentos={DOCUMENTOS}
        iconos={ICONOS_SECCION}
        idAncla="capital-humano"
      />

      {/* Cédulas y carnés de salud viven en una página aparte: acá va solo el
          título con el link para entrar a verlos. */}
      <section className="bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <Link
            href="/capital-humano/documentacion-personal"
            className="group flex flex-col gap-6 rounded-2xl border border-gray-200 bg-white p-8 transition-colors duration-200 hover:border-[#ca3517] sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-start gap-4">
              <IconoCapitalHumano className="mt-1 h-8 w-8 shrink-0 text-[#ca3517]" />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Cédulas de identidad y carnés de salud
                </h2>
                <div className="mt-2 h-1 w-16 rounded bg-[#ca3517]" />
                <p className="mt-4 max-w-xl text-sm text-gray-500">
                  Documentación personal del equipo. Entrá para verla en una
                  página aparte.
                </p>
              </div>
            </div>

            <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-[#ca3517] px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 group-hover:bg-[#a82d12] sm:self-center">
              Ver documentación
              {cantidadDocPersonal > 0 && (
                <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                  {cantidadDocPersonal}
                </span>
              )}
              <IconoFlecha className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
