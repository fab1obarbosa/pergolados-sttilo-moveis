import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "./pages/Home";
import { Projetos } from "./pages/Projetos";
import { Orcamento } from "./pages/Orcamento";
import { useLenis } from "./hooks/useLenis";
import { trackContact, trackPageView } from "./lib/track";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return null;
}

/**
 * A SPA não recarrega o HTML ao trocar de rota, então o PageView do snippet do
 * <head> só conta a primeira página. Aqui reemite a cada navegação (pulando a
 * primeira, que o snippet já mandou).
 */
function Pixels() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.__pergoladosPrimeiraRota === undefined) {
      window.__pergoladosPrimeiraRota = pathname;
      return; // o snippet do <head> já contou esta
    }
    trackPageView(pathname);
  }, [pathname]);

  // Um ouvinte só, na captura do documento, para TODO link de WhatsApp da
  // página. Evita espalhar onClick por header, hero, portfólio, CTA e footer,
  // e já cobre qualquer botão novo que apareça depois.
  useEffect(() => {
    const aoClicar = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement | null)?.closest?.("a[href*='wa.me/']");
      if (!alvo) return;
      trackContact(alvo.textContent?.trim().slice(0, 60) || "WhatsApp");
    };
    document.addEventListener("click", aoClicar, true);
    return () => document.removeEventListener("click", aoClicar, true);
  }, []);

  return null;
}

declare global {
  interface Window {
    __pergoladosPrimeiraRota?: string;
  }
}

export default function App() {
  useLenis();
  return (
    <>
      <ScrollToTop />
      <Pixels />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projetos" element={<Projetos />} />
        <Route path="/orcamento" element={<Orcamento />} />
      </Routes>
    </>
  );
}
