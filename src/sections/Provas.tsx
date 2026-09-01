import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Titulo } from "../components/Titulo";
import { FundoSecao } from "../components/FundoSecao";
import { depoimentos } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

function Cartao({ d }: { d: (typeof depoimentos)[number] }) {
  return (
    <figure className="group relative flex h-full flex-col border border-white/12 bg-white/[0.04] px-7 py-8 transition-colors duration-500 hover:border-laranja/50 hover:bg-white/[0.07]">
      {/* traço que preenche o topo do cartão no hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-laranja transition-transform duration-500 ease-exp group-hover:scale-x-100"
      />

      <Quote size={26} className="text-laranja/40" aria-hidden="true" />

      {d.texto ? (
        <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-white/90">{d.texto}</blockquote>
      ) : (
        <p className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-claro-fraco">
          Avaliação de cinco estrelas no Google, sem comentário escrito.
        </p>
      )}

      <div className="mt-6 flex gap-1 text-laranja" aria-label="5 de 5 estrelas">
        {[0, 1, 2, 3, 4].map((s) => (
          <Star key={s} size={14} fill="currentColor" strokeWidth={0} />
        ))}
      </div>

      <figcaption className="mt-5 flex items-center gap-3.5 border-t border-white/12 pt-5">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 shrink-0 place-items-center bg-laranja/15 font-display text-[1.05rem] text-laranja-claro"
        >
          {d.nome.charAt(0)}
        </span>
        <span>
          <span className="block font-display text-[1.05rem] uppercase leading-none text-white">{d.nome}</span>
          <span className="mt-1.5 block text-[0.8rem] text-claro-fraco">{d.cidade}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Provas() {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", loop: true, slidesToScroll: 3, breakpoints: { "(max-width: 1023px)": { slidesToScroll: 1 } } });
  const [idx, setIdx] = useState(0);
  const [pontos, setPontos] = useState<number[]>([]);

  useEffect(() => {
    if (!embla) return;
    const on = () => {
      setIdx(embla.selectedScrollSnap());
      setPontos(embla.scrollSnapList().map((_, i) => i));
    };
    embla.on("select", on);
    embla.on("reInit", on);
    on();
    return () => {
      embla.off("select", on);
      embla.off("reInit", on);
    };
  }, [embla]);

  return (
    <section className="relative overflow-hidden bg-noite py-24 md:py-28">
      <FundoSecao
        src="/img/fundo-01.webp"
        opacidade={0.28}
        veu="linear-gradient(180deg, rgba(10,19,48,.93) 0%, rgba(10,19,48,.8) 45%, rgba(10,19,48,.95) 100%)"
      />

      <div className="relative z-conteudo">
        <div className="wrap text-center">
          <Titulo
            className="h-sec mx-auto max-w-[20ch]"
            linhas={[
              <>
                Quem já tem um <span className="text-laranja-claro">recomenda.</span>
              </>,
            ]}
          />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="lede mx-auto mt-6 text-claro-fraco"
          >
            São clientes da região que já receberam o projeto montado e contaram como foi do orçamento até a última viga
            instalada.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
          className="wrap mt-12"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-5">
              {depoimentos.map((d) => (
                <div
                  key={d.nome}
                  className="flex-[0_0_86%] sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)]"
                >
                  <Cartao d={d} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {pontos.map((i) => (
              <button
                key={i}
                onClick={() => embla?.scrollTo(i)}
                aria-label={`Avaliação ${i + 1}`}
                aria-selected={idx === i}
                role="tab"
                className={`h-0.5 transition-all duration-500 ease-exp ${
                  idx === i ? "w-10 bg-laranja" : "w-5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
