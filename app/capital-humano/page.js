import Hero from "@/components/Hero";
import IconoCapitalHumano from "@/components/iconos/IconoCapitalHumano";
import ListadoDocumentos from "@/components/ListadoDocumentos";
import { CATEGORIAS_CAPITAL_HUMANO } from "@/datos/documentos";
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

export default async function PaginaCapitalHumano() {
  const documentosPersistidos = await listarDocumentos();
  const DOCUMENTOS = documentosPersistidos
    .filter((documento) =>
      Object.hasOwn(CATEGORIAS_CAPITAL_HUMANO, documento.seccion)
    )
    .map((documento) => ({
      ...documento,
      archivo: `/documentos/archivo/${documento.id}`,
    }));

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
    </>
  );
}
