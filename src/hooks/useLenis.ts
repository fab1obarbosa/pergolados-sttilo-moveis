import { useEffect } from "react";
import Lenis from "lenis";
import { registrarLenis } from "../lib/scroll";

/** Rolagem com inércia. Desligada por completo em movimento reduzido. */
export function useLenis() {
  useEffect(() => {
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduzido) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3.2),
      smoothWheel: true,
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
