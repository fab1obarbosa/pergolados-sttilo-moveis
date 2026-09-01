const WHATSAPP_NUMBER = "5547991190524";

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const waMessages = {
  header: "Olá! Vim pela página de pergolados da Sttilo Móveis.",
  hero: "Olá! Vim pela página de pergolados e gostaria de solicitar um orçamento.",
  processo: "Olá! Vim pela página de pergolados e queria entender melhor o processo antes de pedir o orçamento.",
  ctaFinal: "Olá! Vim pela página de pergolados e quero solicitar meu orçamento.",
  floating: "Olá! Vim pela página de pergolados da Sttilo Móveis.",
  galeria: "Olá! Vi os projetos de pergolados da Sttilo Móveis e quero solicitar um orçamento.",
} as const;
