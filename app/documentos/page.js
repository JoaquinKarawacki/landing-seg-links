import IconoMarketing from "@/components/iconos/IconoMarketing";
import IconoProcedimiento from "@/components/iconos/IconoProcedimiento";
import TarjetaDocumento from "@/components/TarjetaDocumento";
import { CATEGORIAS_DOCUMENTOS, DOCUMENTOS } from "@/datos/documentos";

export const metadata = {
  title: "Documentos · SEG Ingeniería",
  description:
    "Procedimientos internos y recursos de marketing de SEG Ingeniería.",
};

const ICONOS_SECCION = {
  Procedimientos: IconoProcedimiento,
  Marketing: IconoMarketing,
};

export default function PaginaDocumentos() {
  const secciones = Object.entries(CATEGORIAS_DOCUMENTOS);

  return (
    <>
      <section className="relative overflow-hidden bg-black px-4 py-20">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Documentos
          </h1>
          <p className="mt-4 max-w-xl text-gray-300">
            Procedimientos internos y recursos de referencia de SEG
            Ingeniería, centralizados por área.
          </p>
        </div>
      </section>

      {secciones.map(([seccion, categorias], indiceSeccion) => {
        const Icono = ICONOS_SECCION[seccion];
        return (
          <section
            key={seccion}
            className={indiceSeccion % 2 === 0 ? "bg-white" : "bg-gray-50"}
          >
            <div className="mx-auto max-w-5xl px-4 py-16">
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
