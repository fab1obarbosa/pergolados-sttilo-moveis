import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Título revelado linha a linha por máscara. Cada linha é um elemento
 * separado, então o efeito é o texto subindo de dentro do próprio corte, não
 * um fade genérico. O texto nasce visível: a máscara só se aplica quando há
 * animação, e com movimento reduzido a linha entra sem deslocamento.
 */
export function Titulo({
  linhas,
  className = "",
  as = "h2",
  atraso = 0,
  aoCarregar = false,
}: {
  linhas: ReactNode[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  atraso?: number;
  aoCarregar?: boolean;
}) {
  const reduzido = useReducedMotion();
  const Tag = as;
  const gatilho = aoCarregar
    ? ({ animate: "visivel" } as const)
    : ({ whileInView: "visivel", viewport: { once: true, amount: 0.45 } } as const);

  return (
    <Tag className={className}>
      <motion.span initial="oculto" {...gatilho} className="block">
        {linhas.map((linha, i) => (
          <span key={i} className="linha-mask">
            <motion.span
              variants={{
                oculto: { y: reduzido ? 0 : "108%", opacity: reduzido ? 0 : 1 },
                visivel: { y: 0, opacity: 1 },
              }}
              transition={{ duration: 0.85, ease: EASE, delay: atraso + i * 0.09 }}
            >
              {linha}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
