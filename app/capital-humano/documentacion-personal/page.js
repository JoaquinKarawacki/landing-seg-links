import Hero from "@/components/Hero";
import IconoCapitalHumano from "@/components/iconos/IconoCapitalHumano";
import ListadoDocumentos from "@/components/ListadoDocumentos";
import {
  CATEGORIAS_DOCUMENTACION_PERSONAL,
  CATEGORIAS_DOC_PERSONAL_EN_CAPITAL_HUMANO,
} from "@/datos/documentos";
import { listarDocumentos } from "@/lib/repositorioDocumentos";

// Mismo motivo que /capital-humano: los archivos viven en el volumen, que no
// existe en build-time.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Documentación personal · SEG Ingeniería",
  description:
    "Cédulas de identidad y carnés de salud del equipo de SEG Ingeniería.",
  robots: { index: false, follow: false },
};

const ICONOS_SECCION = {
  "Documentación personal": IconoCapitalHumano,
};

export default async function PaginaDocumentacionPersonal() {
  const documentosPersistidos = await listarDocumentos();
  // Las cédulas y carnés se guardan bajo la sección "Capital humano" en el
  // índice; acá se listan bajo el título "Documentación personal", así que se
  // reetiqueta la sección al mapearlos (funciona igual para lo ya subido y para
  // lo que se suba nuevo desde el panel).
  const DOCUMENTOS = documentosPersistidos
    .filter(
      (documento) =>
        documento.seccion === "Capital humano" &&
        CATEGORIAS_DOC_PERSONAL_EN_CAPITAL_HUMANO.includes(documento.categoria)
    )
    .map((documento) => ({
      ...documento,
      seccion: "Documentación personal",
      archivo: `/documentos/archivo/${documento.id}`,
    }));

  return (
    <>
      <Hero
        volverHref="/capital-humano"
        volverLabel="Volver a Capital humano"
        titulo={
          <>
            Documentación personal
            <br className="hidden sm:block" /> del equipo.
          </>
        }
        subtitulo="Cédulas de identidad y carnés de salud del equipo de SEG Ingeniería."
        ctaHref="#documentacion-personal"
        ctaLabel="Ver documentos"
        estadisticaValor={DOCUMENTOS.length}
        estadisticaLabel="documentos disponibles"
        anclaScroll="#documentacion-personal"
        anclaScrollEtiqueta="Ir a la lista de documentación personal"
      />

      <ListadoDocumentos
        categorias={CATEGORIAS_DOCUMENTACION_PERSONAL}
        documentos={DOCUMENTOS}
        iconos={ICONOS_SECCION}
        idAncla="documentacion-personal"
      />
    </>
  );
}
