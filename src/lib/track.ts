/**
 * track.ts — Meta Pixel e Google tag.
 *
 * Os dois snippets base (init + PageView / config) rodam no <head> do
 * index.html. Aqui só ficam os eventos: a página é SPA, então a troca de rota
 * não recarrega o HTML e precisa reemitir o pageview na mão.
 *
 * Nada aqui pode quebrar a página: se o bloqueador de anúncio do visitante
 * derrubar o fbq ou o gtag, as funções viram no-op.
 */

export const META_PIXEL_ID = "960670116037675";
export const GOOGLE_ADS_ID = "AW-16929851348";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Rota nova na SPA: reemite o pageview nos dois. */
export function trackPageView(path: string): void {
  window.fbq?.("track", "PageView");
  window.gtag?.("config", GOOGLE_ADS_ID, { page_path: path });
}

/** Clique em qualquer botão que leva pro WhatsApp. */
export function trackContact(origem: string): void {
  window.fbq?.("track", "Contact", {
    content_name: origem,
    content_category: "Pergolados",
  });
  window.gtag?.("event", "contact", { event_category: "Pergolados", event_label: origem });
}

/** Formulário de orçamento enviado. */
export function trackLead(origem: string): void {
  window.fbq?.("track", "Lead", {
    content_name: origem,
    content_category: "Pergolados",
  });
  window.gtag?.("event", "generate_lead", { event_category: "Pergolados", event_label: origem });
}

/** Começou a preencher o formulário (primeiro campo válido). */
export function trackFormStart(): void {
  window.fbq?.("track", "InitiateCheckout", {
    content_name: "Formulário de orçamento iniciado",
    content_category: "Pergolados",
  });
  window.gtag?.("event", "begin_checkout", { event_category: "Pergolados" });
}
