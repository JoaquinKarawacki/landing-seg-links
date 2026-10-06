"use client";

// Botón de submit que pide confirmación antes de ejecutar una acción destructiva.
// Se usa dentro de un <form action={...}> con los inputs ocultos que necesite.
export default function BotonConfirmar({ mensaje, children, className }) {
  return (
    <button
      type="submit"
      onClick={(evento) => {
        if (!confirm(mensaje)) evento.preventDefault();
      }}
      className={className}
    >
      {children}
    </button>
  );
}
