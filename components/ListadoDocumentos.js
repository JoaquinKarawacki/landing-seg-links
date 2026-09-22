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

            <div className="space-y-10">
              {categoriasSeccion.map((categoria) => {
                const documentosCategoria = documentos.filter(
                  (documento) =>
                    documento.seccion === seccion &&
                    documento.categoria === categoria
                );

                return (
                  <div key={categoria}>
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
                      {categoria}
                    </h3>

                    {documentosCategoria.length === 0 ? (
                      <p className="text-sm text-gray-400">
                        Todavía no hay documentos acá.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {documentosCategoria.map((documento) => (
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
    }
  );
}
