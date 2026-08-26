export default function FormularioClave({ accion, error }) {
  return (
    <form action={accion} className="w-full max-w-sm">
      <label
        htmlFor="clave"
        className="mb-2 block text-left text-xs font-semibold uppercase tracking-widest text-gray-400"
      >
        Clave de acceso
      </label>
      <input
        id="clave"
        name="clave"
        type="password"
        required
        autoFocus
        className="w-full rounded-lg border border-gray-700 bg-black/40 px-4 py-3 text-white placeholder:text-gray-600 focus:border-[#ca3517] focus:outline-none"
        placeholder="••••••••"
      />
      {error && (
        <p className="mt-3 text-sm text-[#ca3517]">
          Clave incorrecta. Probá de nuevo.
        </p>
      )}
      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-[#ca3517] px-8 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#a82d12]"
      >
        Ingresar
      </button>
    </form>
  );
}
