import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Titulo } from "../components/Titulo";

const EASE = [0.16, 1, 0.3, 1] as const;

export function QuemFabrica() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const desloca = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <section id="sttilo" className="relative bg-serragem text-tinta">
      <div className="grid lg:grid-cols-[1.06fr_0.94fr]">
        <div className="px-[clamp(1.25rem,5vw,4rem)] py-24 md:py-32 lg:pl-[max(1.25rem,calc((100vw-1240px)/2+3.5rem))]">
          <Titulo className="h-sec max-w-[15ch]" linhas={[<>Quem fabrica</>, <>assina o que</>, <>entrega.</>]} />

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.12 }}
            className="mt-8 space-y-5"
          >
            <p className="lede text-tinta-fraca">
              Jonathan tem mais de 15 anos de marcenaria e comanda uma equipe capacitada para entregar os melhores
              projetos, do corte da peça até a última viga instalada.
            </p>
            <p className="lede text-tinta-fraca">
              A Sttilo não busca entregar preço. Busca entregar qualidade e durabilidade no longo prazo, porque o
              pergolado montado hoje precisa continuar de pé daqui a vinte anos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="regua mt-12 origin-left text-tinta"
            aria-hidden="true"
          />

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 font-display text-[1.15rem] uppercase tracking-wide text-tinta"
          >
            Jonathan · <span className="text-laranja">Sttilo Móveis</span>
          </motion.p>
        </div>

        <div ref={ref} className="relative min-h-[62vh] overflow-hidden lg:min-h-full">
          <motion.img
            style={{ y: desloca }}
            src="/img/jonathan.webp"
            alt="Jonathan, responsável pela Sttilo Móveis, na oficina"
            loading="lazy"
            className="absolute inset-0 h-[114%] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
