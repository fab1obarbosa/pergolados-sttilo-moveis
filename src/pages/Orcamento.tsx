import { useEffect } from "react";
import { Pagina } from "./Pagina";
import { Formulario } from "../sections/Formulario";
import { DestinoProvider } from "../lib/cta";

/**
 * Mesma página da home, com o formulário no lugar da chamada final. Todo botão
 * de orçamento do meio da página desce até ele em vez de abrir o WhatsApp.
 */
export function Orcamento() {
  useEffect(() => {
    document.title = "Monte seu orçamento | Pergolados Sttilo Móveis";

    // Conteúdo quase idêntico ao da home: fora do índice, para as duas não
    // brigarem entre si na busca. Esta rota existe para anúncio, não para SEO.
    const tag = document.createElement("meta");
    tag.name = "robots";
    tag.content = "noindex, follow";
    document.head.appendChild(tag);

    return () => {
      document.title = "Pergolados Sttilo Móveis";
      tag.remove();
    };
  }, []);

  return (
    <DestinoProvider destino="formulario">
      <Pagina final={<Formulario />} />
    </DestinoProvider>
  );
}
