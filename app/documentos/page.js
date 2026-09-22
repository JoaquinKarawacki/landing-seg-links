import Hero from "@/components/Hero";
import IconoMarketing from "@/components/iconos/IconoMarketing";
import IconoProcedimiento from "@/components/iconos/IconoProcedimiento";
import ListadoDocumentos from "@/components/ListadoDocumentos";
import { CATEGORIAS_DOCUMENTOS } from "@/datos/documentos";
import { listarDocumentos } from "@/lib/repositorioDocumentos";

// Los documentos viven en un volumen que no existe en build-time: si Next
// prerenderiza esta página como estática, queda "congelada" en el estado
// vacío del build hasta la próxima revalidación manual. Forzar dynamic
// evita eso — siempre lee el estado real del volumen en cada request.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Documentos · SEG Ingeniería",
  description:
    "Procedimientos internos y recursos de marketing de SEG Ingeniería.",
};

const ICONOS_SECCION = {
  Procedimientos: IconoProcedimiento,
  Marketing: IconoMarketing,
};

export default async function PaginaDocumentos() {
  const documentosPersistidos = await listarDocumentos();
  // El índice es compartido con Capital humano: quedarse solo con las
  // secciones de esta página (también para el contador del Hero).
  const DOCUMENTOS = documentosPersistidos
    .filter((documento) => Object.hasOwn(CATEGORIAS_DOCUMENTOS, documento.seccion))
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
            Todos los documentos de SEG,
            <br className="hidden sm:block" /> en un solo lugar.
          </>
        }
        subtitulo="Procedimientos internos y recursos de marketing de SEG Ingeniería, centralizados por área."
        ctaHref="#documentos"
        ctaLabel="Ver documentos"
        estadisticaValor={DOCUMENTOS.length}
        estadisticaLabel="documentos disponibles"
        anclaScroll="#documentos"
        anclaScrollEtiqueta="Ir a la lista de documentos"
      />

      <ListadoDocumentos
        categorias={CATEGORIAS_DOCUMENTOS}
        documentos={DOCUMENTOS}
        iconos={ICONOS_SECCION}
        idAncla="documentos"
      />
    </>
  );
}
