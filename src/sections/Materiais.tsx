import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { madeiras } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Materiais() {
  const [ativo, setAtivo] = useState(0);
  const atual = madeiras[ativo];

  return (
    <section id="materiais" className="relative bg-serragem text-tinta">
      <div className="serra absolute inset-0 z-fundo" aria-hidden="true" />

      <div className="wrap relative z-conteudo py-24 md:py-32">
        <Titulo className="h-sec max-w-[16ch]" linhas={[<>Escolha a madeira</>, <>do seu projeto.</>]} />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
          className="lede mt-6 text-tinta-fraca"
        >
          Não existe melhor ou pior. Existe a certa para o uso, o ambiente e o quanto você quer investir.
        </motion.p>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          {/* seletor */}
          <div className="border-t border-tinta/15">
            {madeiras.map((m, i) => {
              const on = i === ativo;
              return (
                <button
                  key={m.id}
                  onClick={() => setAtivo(i)}
                  aria-pressed={on}
                  className={`group flex w-full items-center gap-4 border-b px-1 py-5 text-left transition-colors duration-400 ease-exp ${
                    on ? "border-laranja" : "border-tinta/15 hover:border-tinta/40"
                  }`}
                >
                  <span className="relative h-14 w-14 shrink-0 overflow-hidden">
                    <img src={m.img} alt="" loading="lazy" className="h-full w-full object-cover" />
                    <span
                      className={`absolute inset-0 transition-opacity duration-400 ${on ? "opacity-0" : "opacity-45 bg-serragem"}`}
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block font-display text-[1.22rem] uppercase leading-none transition-colors duration-300 ${
                        on ? "text-laranja" : "text-tinta"
                      }`}
                    >
                      {m.nome}
                    </span>
                    <span className="mt-1.5 block text-[0.8rem] text-tinta-fraca">{m.nivelTag}</span>
                  </span>

                  {/* nível de investimento em traços */}
                  <span className="flex shrink-0 gap-1" aria-hidden="true">
                    {[1, 2, 3, 4].map((n) => (
                      <i
                        key={n}
                        className={`block h-5 w-1 transition-colors duration-400 ${
                          n <= m.nivel ? (on ? "bg-laranja" : "bg-tinta/45") : "bg-tinta/15"
                        }`}
                      />
                    ))}
                  </span>
                </button>
              );
            })}
          </div>

          {/* painel */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={atual.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={atual.img} alt={`Projeto em ${atual.nome}`} loading="lazy" className="h-full w-full object-cover" />
                </div>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                  {atual.bullets.map((b, i) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE, delay: 0.08 + i * 0.06 }}
                      className="flex gap-3 border-t border-tinta/15 pt-3.5"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-laranja" aria-hidden="true" />
                      <span className="text-[0.94rem] text-tinta">{b}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
