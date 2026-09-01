import { motion } from "framer-motion";
import { Botao } from "../components/Botao";
import { Titulo } from "../components/Titulo";
import { Icon } from "../components/Icon";
import { ctaBullets } from "../data/content";
import { waLink, waMessages } from "../lib/whatsapp";

const EASE = [0.16, 1, 0.3, 1] as const;

export function CtaFinal() {
  return (
    <section className="relative overflow-hidden py-28 text-center md:py-36">
      <div className="absolute inset-0 z-fundo" aria-hidden="true">
        <img src="/img/proj-09.webp" alt="" className="h-full w-full object-cover" />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(10,19,48,.95) 0%, rgba(10,19,48,.86) 50%, rgba(10,19,48,.96) 100%)" }}
        />
        {/* grade fina, só aqui, como planta de obra */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(174,187,214,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(174,187,214,.07) 1px, transparent 1px)",
            backgroundSize: "76px 76px",
            maskImage: "radial-gradient(ellipse 78% 70% at 50% 45%, #000 30%, transparent 76%)",
          }}
        />
      </div>

      <div className="wrap relative z-conteudo">
        <Titulo className="h-sec mx-auto max-w-[18ch]" linhas={[<>Manda uma foto</>, <>do seu espaço.</>]} />

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.22 }}
          className="lede mx-auto mt-9 text-claro-fraco"
        >
          A gente responde com as possibilidades de madeira, cobertura e acabamento, e monta o orçamento fechado e
          sob medida.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
          className="mt-11"
        >
          <Botao href={waLink(waMessages.ctaFinal)} target="_blank" rel="noopener noreferrer" tamanho="lg" seta>
            Pedir meu orçamento
          </Botao>
        </motion.div>

        <ul className="mx-auto mt-14 flex max-w-[720px] flex-wrap justify-center gap-x-12 gap-y-6">
          {ctaBullets.map((b, i) => (
            <motion.li
              key={b.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: EASE, delay: 0.44 + i * 0.09 }}
              className="flex items-center gap-2.5 text-[0.9rem] text-claro-fraco"
            >
              <Icon name={b.icon} size={19} className="text-laranja-claro" />
              {b.label}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
