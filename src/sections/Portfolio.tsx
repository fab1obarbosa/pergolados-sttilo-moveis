import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Titulo } from "../components/Titulo";
import { projetosHome } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Portfolio() {
  // slidesToScroll: 3 -> as setas andam um pacote inteiro por vez
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", slidesToScroll: 3, containScroll: "trimSnaps" });
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState<number[]>([]);

  const anterior = useCallback(() => embla?.scrollPrev(), [embla]);
  const proximo = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const atualiza = () => {
      setPagina(embla.selectedScrollSnap());
      setPaginas(embla.scrollSnapList().map((_, i) => i));
    };
    embla.on("select", atualiza);
    embla.on("reInit", atualiza);
    atualiza();
    return () => {
      embla.off("select", atualiza);
      embla.off("reInit", atualiza);
    };
  }, [embla]);

  return (
    <section id="projetos" className="relative bg-noite">
      <div className="wrap relative z-conteudo py-24 md:py-32">
        <div className="text-center">
          <Titulo className="h-sec mx-auto max-w-[18ch]" linhas={[<>Projetos que já</>, <>estão de pé.</>]} />
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="lede mx-auto mt-6 text-claro-fraco"
          >
            Aqui tem pergolado de vários materiais, tamanhos e cores. Tudo personalizado para o que a sua área precisa e
            para o que você quer ver no resultado final.
          </motion.p>
        </div>

        <div className="mt-12 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {projetosHome.map((p, i) => (
              <motion.article
                key={p.img}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.09 }}
                className="group relative aspect-[3/4] flex-[0_0_calc(100%-0px)] overflow-hidden sm:flex-[0_0_calc(50%-10px)] lg:flex-[0_0_calc(33.333%-14px)]"
              >
                <img
                  src={p.img}
                  alt={`${p.legenda}, entregue em ${p.titulo}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-exp group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noite via-noite/25 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-display text-[1.15rem] uppercase leading-none text-white">{p.titulo}</p>
                  {/* o material sobe do corte no hover, não fica pairando */}
                  <span className="linha-mask mt-2 h-5">
                    <span className="block translate-y-full text-[0.85rem] text-laranja-claro transition-transform duration-500 ease-exp group-hover:translate-y-0">
                      {p.legenda}
                    </span>
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-3">
              <button
                onClick={anterior}
                aria-label="Projetos anteriores"
                className="grid h-12 w-12 place-items-center border border-white/25 text-white transition-colors duration-300 hover:border-laranja hover:bg-laranja"
              >
                <ArrowLeft size={19} />
              </button>
              <button
                onClick={proximo}
                aria-label="Próximos projetos"
                className="grid h-12 w-12 place-items-center border border-white/25 text-white transition-colors duration-300 hover:border-laranja hover:bg-laranja"
              >
                <ArrowRight size={19} />
              </button>
            </div>

            <div className="flex gap-2" role="tablist" aria-label="Páginas de projetos">
              {paginas.map((i) => (
                <button
                  key={i}
                  onClick={() => embla?.scrollTo(i)}
                  aria-label={`Ir para o grupo ${i + 1}`}
                  aria-selected={pagina === i}
                  role="tab"
                  className={`h-0.5 transition-all duration-500 ease-exp ${
                    pagina === i ? "w-10 bg-laranja" : "w-5 bg-white/25 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          <Link
            to="/projetos"
            className="group inline-flex items-center gap-2.5 border border-white/30 px-7 py-3 font-display text-[0.95rem] uppercase tracking-wide text-white transition-colors duration-300 hover:border-white/70"
          >
            Ver mais trabalhos
            <ArrowRight size={17} className="transition-transform duration-400 ease-exp group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
