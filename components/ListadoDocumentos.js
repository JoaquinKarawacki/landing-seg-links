import TarjetaDocumento from "./TarjetaDocumento";

// Listado de secciones → categorías → documentos. Lo usan /documentos y
// /capital-humano: cada página le pasa su propia taxonomía.
export default function ListadoDocumentos({
  categorias,
  documentos,
  iconos,
  idAncla,
}) {
  return Object.entries(categorias).map(
    ([seccion, categoriasSeccion], indiceSeccion) => {
      const Icono = iconos[seccion];

      // Solo las categorías que hoy tienen algún documento. Las vacías no se
      // renderizan (antes cada una mostraba un "Todavía no hay documentos acá."
      // y llenaban la página de mensajes repetidos).
      const categoriasConDocumentos = categoriasSeccion
        .map((categoria) => ({
          categoria,
          documentosCategoria: documentos.filter(
            (documento) =>
              documento.seccion === seccion &&
              documento.categoria === categoria
          ),
        }))
        .filter(({ documentosCategoria }) => documentosCategoria.length > 0);

      const seccionVacia = categoriasConDocumentos.length === 0;

      return (
        <section
          key={seccion}
          id={indiceSeccion === 0 ? idAncla : undefined}
          className={`scroll-mt-[92px] ${
            indiceSeccion % 2 === 0 ? "bg-white" : "bg-gray-50"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-16">
            <div className="mb-10 flex items-center gap-4">
              {Icono && <Icono className="h-8 w-8 text-[#ca3517]" />}
              <div>
                <h2 className="text-3xl font-bold text-gray-900">{seccion}</h2>
                <div className="mt-2 h-1 w-16 rounded bg-[#ca3517]" />
              </div>
            </div>

            {seccionVacia ? (
              // Sección entera sin documentos: un único empty-state en vez de
              // repetir el mensaje por cada categoría.
              <div className="rounded-xl border border-dashed border-gray-200 bg-white/50 px-6 py-12 text-center">
                <p className="text-sm font-medium text-gray-500">
                  Todavía no hay documentos en esta sección.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Se cargan desde el panel de administración.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {categoriasConDocumentos.map(
                  ({ categoria, documentosCategoria }) => (
                    <div key={categoria}>
                      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        {categoria}
                      </h3>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {documentosCategoria.map((documento) => (
                          <TarjetaDocumento
                            key={documento.id}
                            documento={documento}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </section>
      );
    }
  );
}
