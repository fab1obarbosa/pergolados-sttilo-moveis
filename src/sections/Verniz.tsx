import { useState } from "react";
import { motion } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { vernizes } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Verniz() {
  const [pausado, setPausado] = useState(false);
  const fila = [...vernizes, ...vernizes]; // duplicata exata: loop fecha sem vão

  return (
    <section className="relative bg-carvao">
      <div className="relative z-conteudo py-24 md:py-32">
        <div className="wrap text-center">
          <Titulo className="h-sec mx-auto max-w-[18ch]" linhas={[<>Você escolhe o tom</>, <>do acabamento.</>]} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="lede mx-auto mt-6 text-claro-fraco"
          >
            Três demãos de Osmocolor aplicadas na fábrica, antes da montagem, em todas as faces da peça. Sem custo
            adicional pela cor.
          </motion.p>
        </div>

        {/* py generoso: o zoom do círculo no hover não pode ser cortado pelo overflow */}
        <div
          className="relative mt-16 overflow-x-hidden py-10"
          onMouseEnter={() => setPausado(true)}
          onMouseLeave={() => setPausado(false)}
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-carvao to-transparent md:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-carvao to-transparent md:w-32" />

          <div className="flex w-max animate-corre-esq" style={{ animationPlayState: pausado ? "paused" : "running" }}>
            {fila.map((v, i) => (
              <div
                key={`${v.nome}-${i}`}
                className="group mr-12 flex shrink-0 flex-col items-center gap-4"
                aria-hidden={i >= vernizes.length}
              >
                <span
                  className="block h-[104px] w-[104px] rounded-full ring-1 ring-white/20 transition-transform duration-500 ease-exp group-hover:scale-[1.28] md:h-[124px] md:w-[124px]"
                  style={{ background: v.hex }}
                />
                <span className="font-display text-[0.95rem] uppercase tracking-wide text-white/60 transition-colors duration-300 group-hover:text-white">
                  {v.nome}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
