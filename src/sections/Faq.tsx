import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { faq } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Faq() {
  // começa tudo fechado
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="relative bg-serragem text-tinta">
      <div className="wrap relative z-conteudo py-24 md:py-28">
        <div className="text-center">
          <Titulo className="h-sec mx-auto max-w-[20ch]" linhas={[<>Perguntas que</>, <>sempre chegam.</>]} />
        </div>

        <div className="mx-auto mt-12 max-w-[780px] border-t border-tinta/15">
          {faq.map((f, i) => {
            const on = aberto === i;
            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, ease: EASE, delay: Math.min(i * 0.04, 0.3) }}
                className="border-b border-tinta/15"
              >
                <button
                  onClick={() => setAberto(on ? null : i)}
                  aria-expanded={on}
                  className="group flex w-full items-center gap-5 py-5 text-left"
                >
                  <span
                    className={`font-display text-[0.82rem] transition-colors duration-300 ${
                      on ? "text-laranja" : "text-tinta-fraca"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex-1 font-display text-[1.08rem] uppercase leading-tight transition-colors duration-300 ${
                      on ? "text-laranja" : "text-tinta group-hover:text-laranja"
                    }`}
                  >
                    {f.q}
                  </span>
                  {/* cruz que gira, desenhada com dois traços */}
                  <span className="relative h-3.5 w-3.5 shrink-0" aria-hidden="true">
                    <span
                      className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transition-colors duration-300 ${
                        on ? "bg-laranja" : "bg-tinta"
                      }`}
                    />
                    <span
                      className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 transition-all duration-500 ease-exp ${
                        on ? "rotate-90 bg-laranja opacity-0" : "bg-tinta opacity-100"
                      }`}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[62ch] pb-6 pl-[3.1rem] text-[0.93rem] text-tinta-fraca">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
