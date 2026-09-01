import { motion } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { coberturas, coresTelha } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Cobertura() {
  return (
    <section className="relative overflow-hidden bg-oficina">
      {/* luz que respira atrás do título, para a seção escura não ficar chapada */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] animate-luz-varre"
        style={{
          background:
            "radial-gradient(46% 58% at 50% 22%, rgba(244,162,86,.14) 0%, rgba(24,95,165,.10) 46%, transparent 74%)",
        }}
      />
      <div className="wrap relative z-conteudo py-24 md:py-32">
        <div className="text-center">
          <Titulo className="h-sec mx-auto max-w-[17ch]" linhas={[<>Agora escolha</>, <>a cobertura.</>]} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="lede mx-auto mt-6 text-claro-fraco"
          >
            A telha decide quanta luz entra, quanto calor passa e como o ambiente fica por baixo.
          </motion.p>
        </div>

        <div className="mt-14 grid gap-px border border-white/12 bg-white/12 md:grid-cols-3">
          {coberturas.map((c, i) => (
            <motion.article
              key={c.nome}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: EASE, delay: i * 0.1 }}
              className="group bg-oficina transition-colors duration-500 hover:bg-noite"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={`Cobertura ${c.nome} instalada pela Sttilo Móveis`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-exp group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-oficina/70 to-transparent" />
              </div>

              <div className="px-7 pb-9 pt-7">
                <h3 className="font-display text-[1.32rem] uppercase leading-tight text-white">{c.nome}</h3>

                <ul className="mt-6 space-y-3.5">
                  {c.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-[0.55em] h-1 w-1 shrink-0 bg-laranja" aria-hidden="true" />
                      <span className="text-[0.91rem] leading-relaxed text-claro-fraco">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>

        {/* cores da telha: quadrados menores, equidistantes, centralizados */}
        <div className="mt-24 text-center">
          <Titulo as="h3" className="h-min mx-auto max-w-[22ch]" linhas={[<>E a cor da telha também é sua.</>]} />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.12 }}
            className="lede mx-auto mt-4 text-claro-fraco"
          >
            Já incluso no seu orçamento: você define qual cor quer e ela é instalada pintada para você. A telha simples
            vai com pintura em uma face, a sanduíche já vai pintada dos dois lados.
          </motion.p>

          <div className="mx-auto mt-12 flex max-w-[880px] flex-wrap justify-center gap-x-7 gap-y-8">
            {coresTelha.map((c, i) => (
              <motion.div
                key={c.nome}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, ease: EASE, delay: Math.min(i * 0.03, 0.4) }}
                className="group w-[86px]"
              >
                <span
                  className="block h-14 w-full ring-1 ring-white/15 transition-transform duration-400 ease-exp group-hover:-translate-y-1.5 group-hover:ring-white/60"
                  style={{ background: c.hex }}
                />
                <p className="mt-2.5 text-[0.76rem] leading-tight text-claro-fraco">{c.nome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
