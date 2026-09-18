import Hero from "@/components/Hero";
import IconoMarketing from "@/components/iconos/IconoMarketing";
import IconoProcedimiento from "@/components/iconos/IconoProcedimiento";
import TarjetaDocumento from "@/components/TarjetaDocumento";
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
  const secciones = Object.entries(CATEGORIAS_DOCUMENTOS);
  const documentosPersistidos = await listarDocumentos();
  const DOCUMENTOS = documentosPersistidos.map((documento) => ({
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

      {secciones.map(([seccion, categorias], indiceSeccion) => {
        const Icono = ICONOS_SECCION[seccion];
        return (
          <section
            key={seccion}
            id={indiceSeccion === 0 ? "documentos" : undefined}
            className={`scroll-mt-[92px] ${
              indiceSeccion % 2 === 0 ? "bg-white" : "bg-gray-50"
            }`}
          >
            <div className="mx-auto max-w-7xl px-4 py-16">
              <div className="mb-10 flex items-center gap-4">
                <Icono className="h-8 w-8 text-[#ca3517]" />
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {seccion}
                  </h2>
                  <div className="mt-2 h-1 w-16 rounded bg-[#ca3517]" />
                </div>
              </div>

              <div className="space-y-10">
                {categorias.map((categoria) => {
                  const documentos = DOCUMENTOS.filter(
                    (documento) =>
                      documento.seccion === seccion &&
                      documento.categoria === categoria
                  );

                  return (
                    <div key={categoria}>
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        {categoria}
                      </h3>

                      {documentos.length === 0 ? (
                        <p className="text-sm text-gray-400">
                          Todavía no hay documentos acá.
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          {documentos.map((documento) => (
                            <TarjetaDocumento
                              key={documento.id}
                              documento={documento}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
