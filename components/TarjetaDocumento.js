import IconoFlecha from "./iconos/IconoFlecha";

function extensionDe(archivo) {
  return archivo.split(".").pop().toUpperCase();
}

export default function TarjetaDocumento({ documento }) {
  return (
    <a
      href={documento.archivo}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#ca3517] text-[10px] font-bold uppercase text-white">
        {extensionDe(documento.archivo)}
      </span>
      <span className="flex-1 text-sm font-medium text-gray-800">
        {documento.titulo}
      </span>
      <IconoFlecha className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
    </a>
  );
}
