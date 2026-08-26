import IconoDashboard from "./IconoDashboard";
import IconoHerramienta from "./IconoHerramienta";
import IconoSistema from "./IconoSistema";

export default function IconoCategoria({ categoria, className }) {
  switch (categoria) {
    case "Dashboards":
      return <IconoDashboard className={className} />;
    case "Herramientas":
      return <IconoHerramienta className={className} />;
    case "Sistemas de gestión":
    default:
      return <IconoSistema className={className} />;
  }
}
