"use client";

import { useEffect, useRef, useState } from "react";

// Revela su contenido con un fade + translateY cuando entra en el viewport.
export default function RevelarAlScroll({ children, retraso = 0, className }) {
  const referencia = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const nodo = referencia.current;
    if (!nodo) return;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true);
          observador.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observador.observe(nodo);
    return () => observador.disconnect();
  }, []);

  return (
    <div
      ref={referencia}
      className={`revelar ${visible ? "revelar-visible" : ""} ${className ?? ""}`}
      style={{ transitionDelay: visible ? `${retraso}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
