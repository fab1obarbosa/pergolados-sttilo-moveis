import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { entregas } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Entrega() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desloca = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section id="entrega" className="relative bg-carvao">
      <div className="grid lg:grid-cols-[0.92fr_1.08fr]">
        {/* foto ocupando a coluna inteira, sangrando na borda */}
        <div ref={ref} className="relative min-h-[58vh] overflow-hidden lg:min-h-full">
          <motion.img
            style={{ y: desloca }}
            src="/img/barato-sai-caro-01.webp"
            alt="Pergolado em madeira de lei instalado na área externa de uma residência"
            loading="lazy"
            className="absolute inset-0 h-[112%] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-carvao/60 via-transparent to-carvao" />
        </div>

        <div className="px-[clamp(1.25rem,5vw,4rem)] py-24 md:py-32">
          <Titulo className="h-sec max-w-[15ch]" linhas={[<>Barato sai caro</>, <>duas vezes.</>]} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="lede mt-6 text-claro-fraco"
          >
            Pergolado mal feito racha, empena e escurece em dois verões. O que segura o projeto de pé por vinte anos
            acontece antes de ele chegar na sua casa.
          </motion.p>

          <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
            {entregas.map((e, i) => (
              <motion.li
                key={e.title}
                initial={{ opacity: 0, x: 26 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                className="group flex gap-6 py-6 transition-colors duration-400"
              >
                <span className="mt-1 font-display text-[0.95rem] text-laranja">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.24rem] uppercase leading-tight text-white transition-transform duration-500 ease-exp group-hover:translate-x-1.5">
                    {e.title}
                  </h3>
                  <p className="mt-2 max-w-[46ch] text-[0.94rem] text-claro-fraco">{e.text}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
