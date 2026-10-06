import { formatearFechaHora } from "@/lib/fechas";
import BotonConfirmar from "@/components/admin/BotonConfirmar";
import {
  activarDesactivarUsuarioAccion,
  crearUsuarioAccion,
  desbloquearUsuarioAccion,
  eliminarUsuarioAccion,
  resetearPasswordAccion,
} from "@/app/admin-documentos/acciones";

export default function PanelUsuarios({ usuarios, conExito, conError }) {
  return (
    <div id="usuarios" className="mt-16 scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Usuarios</h2>
        <div className="mt-2 h-1 w-16 rounded bg-[#ca3517]" />
        <p className="mt-3 text-sm text-gray-500">
          Cuentas de acceso de empleados ({usuarios.length}).
        </p>
      </div>

      {/* Alta */}
      <div className="mb-10 rounded-xl border border-gray-100 bg-gray-50 p-6">
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
          Crear usuario
        </h3>

        {conError && (
          <p className="mb-4 text-sm text-[#ca3517]">
            No se pudo crear el usuario. Revisá que el email no exista ya y que la
            contraseña tenga al menos 8 caracteres.
          </p>
        )}
        {conExito && (
          <p className="mb-4 text-sm text-green-700">Listo, usuario guardado.</p>
        )}

        <form action={crearUsuarioAccion} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="u-email" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Email
            </label>
            <input
              id="u-email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
              placeholder="nombre@segingenieria.com"
            />
          </div>
          <div>
            <label htmlFor="u-nombre" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Nombre
            </label>
            <input
              id="u-nombre"
              name="nombre"
              type="text"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
              placeholder="Nombre y apellido"
            />
          </div>
          <div>
            <label htmlFor="u-rol" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Rol
            </label>
            <select
              id="u-rol"
              name="rol"
              defaultValue="empleado"
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
            >
              <option value="empleado">Empleado</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label htmlFor="u-password" className="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500">
              Contraseña (mín. 8)
            </label>
            <input
              id="u-password"
              name="password"
              type="text"
              required
              minLength={8}
              className="w-full rounded-lg border border-gray-200 px-4 py-2.5 focus:border-[#ca3517] focus:outline-none"
              placeholder="contraseña inicial"
            />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
            >
              Crear usuario
            </button>
          </div>
        </form>
      </div>

      {/* Listado */}
      <ul className="space-y-2">
        {usuarios.map((usuario) => {
          const bloqueado = usuario.bloqueado;

          return (
            <li
              key={usuario.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-gray-100 bg-white p-3"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">{usuario.email}</span>
                  {usuario.rol === "admin" && (
                    <span className="rounded-full bg-gray-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      Admin
                    </span>
                  )}
                  {!usuario.activo && (
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600">
                      Inactivo
                    </span>
                  )}
                  {bloqueado && (
                    <span className="rounded-full bg-[#ca3517]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ca3517]">
                      Bloqueado hasta {formatearFechaHora(usuario.bloqueadoHasta)}
                    </span>
                  )}
                </div>
                {usuario.nombre && (
                  <span className="text-xs text-gray-500">{usuario.nombre}</span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Resetear contraseña */}
                <form action={resetearPasswordAccion} className="flex items-center gap-1">
                  <input type="hidden" name="id" value={usuario.id} />
                  <input
                    name="password"
                    type="text"
                    required
                    minLength={8}
                    placeholder="nueva clave"
                    className="w-28 rounded-full border border-gray-200 px-3 py-1 text-xs focus:border-[#ca3517] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-full border-2 border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-[#ca3517] hover:text-[#ca3517]"
                  >
                    Resetear
                  </button>
                </form>

                {/* Desbloquear (solo si está bloqueado) */}
                {bloqueado && (
                  <form action={desbloquearUsuarioAccion}>
                    <input type="hidden" name="id" value={usuario.id} />
                    <button
                      type="submit"
                      className="rounded-full border-2 border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-[#ca3517] hover:text-[#ca3517]"
                    >
                      Desbloquear
                    </button>
                  </form>
                )}

                {/* Activar / desactivar */}
                <form action={activarDesactivarUsuarioAccion}>
                  <input type="hidden" name="id" value={usuario.id} />
                  <input type="hidden" name="activar" value={usuario.activo ? "0" : "1"} />
                  <button
                    type="submit"
                    className="rounded-full border-2 border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-700"
                  >
                    {usuario.activo ? "Desactivar" : "Activar"}
                  </button>
                </form>

                {/* Eliminar */}
                <form action={eliminarUsuarioAccion}>
                  <input type="hidden" name="id" value={usuario.id} />
                  <BotonConfirmar
                    mensaje={`¿Eliminar al usuario ${usuario.email}? Esta acción no se puede deshacer.`}
                    className="rounded-full border-2 border-gray-200 px-3 py-1 text-xs font-semibold text-gray-500 transition-colors hover:border-[#ca3517] hover:text-[#ca3517]"
                  >
                    Eliminar
                  </BotonConfirmar>
                </form>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
