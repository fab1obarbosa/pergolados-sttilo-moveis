import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variante?: "solido" | "linha" | "linhaEscura";
  seta?: boolean;
  tamanho?: "md" | "lg";
};

/**
 * Canto vivo (2px). O preenchimento entra por baixo no hover, como tinta
 * subindo na peça, em vez do fade padrão.
 */
export function Botao({
  children,
  variante = "solido",
  seta = false,
  tamanho = "md",
  className = "",
  ...rest
}: Props) {
  const base =
    "group relative inline-flex items-center justify-center gap-2.5 rounded-sm font-display font-semibold uppercase tracking-wide overflow-hidden transition-colors duration-300 ease-exp";
  const dim = tamanho === "lg" ? "px-9 py-4 text-[1.05rem]" : "px-7 py-3 text-[0.95rem]";

  const pele =
    variante === "solido"
      ? "bg-laranja text-white"
      : variante === "linha"
        ? "border border-white/30 text-white hover:border-white/70"
        : "border border-tinta/25 text-tinta hover:border-tinta/60";

  return (
    <a {...rest} className={`${base} ${dim} ${pele} ${className}`}>
      {variante === "solido" && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-[#c9491a] origin-bottom scale-y-0 transition-transform duration-400 ease-exp group-hover:scale-y-100"
        />
      )}
      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {seta && <ArrowRight size={17} className="transition-transform duration-400 ease-exp group-hover:translate-x-1.5" />}
      </span>
    </a>
  );
}
