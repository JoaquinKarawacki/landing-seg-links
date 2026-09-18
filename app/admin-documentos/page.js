import { cookies } from "next/headers";
import FormularioClave from "@/components/FormularioClave";
import BotonEliminarDocumento from "@/components/admin/BotonEliminarDocumento";
import IconoCandado from "@/components/iconos/IconoCandado";
import { CATEGORIAS_DOCUMENTOS } from "@/datos/documentos";
import { listarDocumentos } from "@/lib/repositorioDocumentos";
import {
  agregarDocumentoAccion,
  cerrarSesionAccion,
  eliminarDocumentoAccion,
  verificarClave,
} from "./acciones";
import { NOMBRE_COOKIE_SESION, sesionValida } from "./sesion";

export const metadata = {
  title: "Administrar documentos · SEG Ingeniería",
  robots: { index: false, follow: false },
};

export default async function PaginaAdminDocumentos({ searchParams }) {
  const cookieStore = await cookies();
  const autenticado = sesionValida(cookieStore.get(NOMBRE_COOKIE_SESION)?.value);
  const parametros = await searchParams;
  const conError = parametros?.error === "1";
  const conExito = parametros?.ok === "1";

  if (!autenticado) {
    return (
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-black px-4 py-20">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#ca3517]" />
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
          <IconoCandado className="h-12 w-12 text-[#ca3517]" />
          <h1 className="mt-6 text-3xl font-bold text-white">Acceso restringido</h1>
          <p className="mb-8 mt-3 text-sm text-gray-400">
            Panel interno para administrar los documentos de SEG Ingeniería.
          </p>
          <FormularioClave accion={verificarClave} error={conError} />
        </div>
      </section>
    );
  }

  const documentos = await listarDocumentos();
  const secciones = Object.entries(CATEGORIAS_DOCUMENTOS);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-4 py-16">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Administrar documentos</h1>
            <div className="mt-2 h-1 w-16 rounded bg-[#ca3517]" />
          </div>
          <form action={cerrarSesionAccion}>
            <button
              type="submit"
              className="text-xs uppercase tracking-widest text-gray-500 transition-colors duration-200 hover:text-[#ca3517]"
            >
              Cerrar sesión
            </button>
          </form>
        </div>

        <div className="mb-12 rounded-xl border border-gray-100 bg-gray-50 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
            Subir documento nuevo
          </h2>

          {conError && (
            <p className="mb-4 text-sm text-[#ca3517]">
              No se pudo subir el documento. Revisá que completaste todos los
              campos y que la extensión del archivo esté permitida.
            </p>
          )}
          {conExito && (
            <p className="mb-4 text-sm text-green-700">Documento subido correctamente.</p>
          )}

          <form action={agregarDocumentoAccion} className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="titulo" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                Título
              </label>
              <input
                id="titulo"
                name="titulo"
                type="text"
                required
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
                placeholder="Ej: A005 · Procedimiento de Compras"
              />
            </div>

            <div>
              <label htmlFor="seccionCategoria" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                Sección / categoría
              </label>
              <select
                id="seccionCategoria"
                name="seccionCategoria"
                required
                defaultValue=""
                className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
              >
                <option value="" disabled>
                  Elegir categoría
                </option>
                {secciones.map(([seccion, categorias]) => (
                  <optgroup key={seccion} label={seccion}>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={`${seccion}|${categoria}`}>
                        {categoria}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="archivo" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
                Archivo
              </label>
              <input
                id="archivo"
                name="archivo"
                type="file"
                required
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#ca3517] file:px-4 file:py-1.5 file:text-xs file:font-semibold file:text-white"
              />
            </div>

            <div className="sm:col-span-2">
              <button
                type="submit"
                className="rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
              >
                Subir documento
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-10">
          {secciones.map(([seccion, categorias]) => (
            <div key={seccion}>
              <h2 className="mb-4 text-lg font-bold text-gray-900">{seccion}</h2>
              <div className="space-y-6">
                {categorias.map((categoria) => {
                  const documentosCategoria = documentos.filter(
                    (documento) =>
                      documento.seccion === seccion && documento.categoria === categoria
                  );

                  return (
                    <div key={categoria}>
                      <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-gray-500">
                        {categoria}
                      </h3>

                      {documentosCategoria.length === 0 ? (
                        <p className="text-sm text-gray-400">Todavía no hay documentos acá.</p>
                      ) : (
                        <ul className="space-y-2">
                          {documentosCategoria.map((documento) => (
                            <li
                              key={documento.id}
                              className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white p-3"
                            >
                              <span className="text-sm font-medium text-gray-800">
                                {documento.titulo}
                              </span>
                              <BotonEliminarDocumento
                                documento={documento}
                                accion={eliminarDocumentoAccion}
                              />
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
