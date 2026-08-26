import RevelarAlScroll from "./RevelarAlScroll";
import TarjetaProyecto from "./TarjetaProyecto";

export default function GrillaProyectos({ proyectos }) {
  if (proyectos.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-gray-500">
        No encontramos proyectos que coincidan con la búsqueda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {proyectos.map((proyecto, indice) => (
        <RevelarAlScroll key={proyecto.id} retraso={(indice % 3) * 80}>
          <TarjetaProyecto proyecto={proyecto} />
        </RevelarAlScroll>
      ))}
    </div>
  );
}
