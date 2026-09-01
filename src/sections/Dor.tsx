import { motion } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { dores } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;
const letras = ["A", "B", "C"];

export function Dor() {
  return (
    <section className="relative bg-serragem text-tinta">
      <div className="serra absolute inset-0 z-fundo" aria-hidden="true" />

      <div className="wrap relative z-conteudo py-24 md:py-32">
        <Titulo
          className="h-sec max-w-[16ch]"
          linhas={[<>Todo mundo quer</>, <>usar a área de fora.</>]}
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
          className="lede mt-6 text-tinta-fraca"
        >
          O que trava é sempre a mesma coisa: sol demais, chuva na hora errada, e um espaço que não convida ninguém a
          ficar.
        </motion.p>

        <div className="mt-16 grid gap-px bg-tinta/12 md:grid-cols-3">
          {dores.map((d, i) => (
            <motion.article
              key={d.title}
              initial="oculto"
              whileInView="visivel"
              viewport={{ once: true, amount: 0.35 }}
              variants={{
                oculto: { opacity: 0, y: 30 },
                visivel: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: i * 0.12 } },
              }}
              className="group relative bg-serragem px-7 pb-9 pt-8 md:px-8"
            >
              {/* a letra sobe do próprio corte quando a coluna entra.
                  As variantes descem do card, então o disparo é o mesmo. */}
              <span className="linha-mask">
                <motion.span
                  variants={{
                    oculto: { y: "110%" },
                    visivel: { y: 0, transition: { duration: 0.85, ease: EASE, delay: 0.12 + i * 0.12 } },
                  }}
                  className="block font-display text-[3.6rem] leading-none text-laranja"
                >
                  {letras[i]}
                </motion.span>
              </span>

              <h3 className="h-min mt-4 max-w-[14ch] text-tinta">{d.title}</h3>
              <p className="mt-3 max-w-[34ch] text-[0.95rem] text-tinta-fraca">{d.text}</p>

              {/* traço que preenche ao passar o cursor */}
              <span
                aria-hidden="true"
                className="absolute inset-x-7 bottom-0 h-0.5 origin-left scale-x-0 bg-laranja transition-transform duration-500 ease-exp group-hover:scale-x-100 md:inset-x-8"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
