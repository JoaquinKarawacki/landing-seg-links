"use client";

export default function BotonEliminarDocumento({ documento, accion }) {
  return (
    <form
      action={accion}
      onSubmit={(evento) => {
        if (!confirm(`¿Eliminar "${documento.titulo}"? Esta acción no se puede deshacer.`)) {
          evento.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={documento.id} />
      <button
        type="submit"
        className="rounded-full border-2 border-gray-200 px-4 py-1.5 text-xs font-semibold text-gray-500 transition-colors duration-200 hover:border-[#ca3517] hover:text-[#ca3517]"
      >
        Eliminar
      </button>
    </form>
  );
}
