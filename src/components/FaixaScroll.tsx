import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Faixa de foto que abre por clip-path ao entrar e fecha ao sair, com a imagem
 * correndo mais devagar que a página. Serve de respiro entre atos.
 */
export function FaixaScroll({ src, alt, frase }: { src: string; alt: string; frase?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduzido = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const corte = useTransform(
    scrollYProgress,
    [0, 0.34, 0.66, 1],
    ["inset(38% 0% 38% 0%)", "inset(0% 0% 0% 0%)", "inset(0% 0% 0% 0%)", "inset(34% 0% 34% 0%)"]
  );
  const desloca = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const veu = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 0.34, 0.34, 0.75]);
  const textoOp = useTransform(scrollYProgress, [0.3, 0.44, 0.6, 0.72], [0, 1, 1, 0]);

  if (reduzido) {
    return (
      <section ref={ref} className="relative h-[42vh] overflow-hidden bg-noite">
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-noite/55" />
        {frase && (
          <p className="absolute inset-0 grid place-items-center px-6 text-center font-display text-[clamp(1.3rem,3vw,2.2rem)] uppercase text-white">
            {frase}
          </p>
        )}
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[78vh] overflow-hidden bg-noite md:h-[88vh]">
      <motion.div style={{ clipPath: corte }} className="absolute inset-0 will-change-[clip-path]">
        <motion.img
          src={src}
          alt={alt}
          loading="lazy"
          style={{ y: desloca }}
          className="absolute inset-0 h-[118%] w-full object-cover will-change-transform"
        />
        <motion.div style={{ opacity: veu }} className="absolute inset-0 bg-noite" />
      </motion.div>

      {frase && (
        <motion.p
          style={{ opacity: textoOp }}
          className="absolute inset-0 grid place-items-center px-6 text-center font-display text-[clamp(1.5rem,3.6vw,2.9rem)] uppercase leading-tight text-white drop-shadow-[0_2px_24px_rgba(10,19,48,.95)]"
        >
          {frase}
        </motion.p>
      )}
    </section>
  );
}
