import type Lenis from "lenis";

let instancia: Lenis | null = null;

export function registrarLenis(l: Lenis | null) {
  instancia = l;
}

/** Rolagem suave até a âncora, com desaceleração longa em vez do salto seco. */
export function irPara(seletor: string) {
  const alvo = document.querySelector(seletor);
  if (!alvo) return;

  const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instancia && !reduzido) {
    instancia.scrollTo(alvo as HTMLElement, { offset: -70, duration: 1.5 });
    return;
  }
  const y = (alvo as HTMLElement).getBoundingClientRect().top + window.scrollY - 70;
  window.scrollTo({ top: y, behavior: reduzido ? "auto" : "smooth" });
}
