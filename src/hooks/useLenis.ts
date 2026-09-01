import { useEffect } from "react";
import Lenis from "lenis";
import { registrarLenis } from "../lib/scroll";

/** Rolagem com inércia. Desligada por completo em movimento reduzido. */
export function useLenis() {
  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;

    const lenis = new Lenis({
      // mais curto e com saída mais macia: a página acompanha o dedo em vez de
      // arrastar atrás dele. O multiplicador tira a sensação de scroll pesado.
      duration: 0.85,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.6,
      syncTouch: false,
    });
    registrarLenis(lenis);

    let quadro = requestAnimationFrame(function raf(tempo: number) {
      lenis.raf(tempo);
      quadro = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(quadro);
      registrarLenis(null);
      lenis.destroy();
    };
  }, []);
}
