import { createContext, useContext, type ReactNode } from "react";
import { waLink, waMessages } from "./whatsapp";
import { irPara } from "./scroll";

/**
 * A mesma página roda em dois destinos:
 *   /            os botões abrem o WhatsApp direto
 *   /orcamento   os mesmos botões descem até o formulário da própria página
 *
 * Em vez de duplicar header, hero, processo e chamada final, cada botão pede
 * o destino aqui. Sem provider, o padrão é WhatsApp: a página de projetos e
 * qualquer seção nova continuam funcionando sem saber que isso existe.
 */

export type Destino = "whatsapp" | "formulario";

type PropsDeBotao = {
  href: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const CtxDestino = createContext<Destino>("whatsapp");

export function DestinoProvider({ destino, children }: { destino: Destino; children: ReactNode }) {
  return <CtxDestino.Provider value={destino}>{children}</CtxDestino.Provider>;
}

/** Âncora do formulário na página /orcamento. */
export const ANCORA_FORM = "#formulario";

export function useCta(chave: keyof typeof waMessages): PropsDeBotao {
  const destino = useContext(CtxDestino);

  if (destino === "formulario") {
    return {
      href: ANCORA_FORM,
      onClick: (e) => {
        e.preventDefault();
        irPara(ANCORA_FORM);
      },
    };
  }

  return { href: waLink(waMessages[chave]), target: "_blank", rel: "noopener noreferrer" };
}
