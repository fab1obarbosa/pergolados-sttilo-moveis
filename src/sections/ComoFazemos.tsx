import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Titulo } from "../components/Titulo";
import { Icon } from "../components/Icon";
import { Botao } from "../components/Botao";
import { etapas, etapaBullets } from "../data/content";
import { waLink, waMessages } from "../lib/whatsapp";

const EASE = [0.16, 1, 0.3, 1] as const;

// altura de scroll que cada etapa ocupa depois da primeira tela
const PASSO_VH = 45;

export function ComoFazemos() {
  const trilho = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);

  // a etapa visível vem direto do progresso do scroll dentro do trilho alto
  const { scrollYProgress } = useScroll({ target: trilho, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.floor(v * etapas.length);
    setAtivo(Math.min(etapas.length - 1, Math.max(0, i)));
  });

  const etapa = etapas[ativo];

  return (
    <section className="relative bg-oficina">
      <div className="serra-clara absolute inset-0 z-fundo opacity-60" aria-hidden="true" />

      <div
        ref={trilho}
        className="relative z-conteudo"
        style={{ height: `calc(100svh + ${(etapas.length - 1) * PASSO_VH}vh)` }}
      >
        {/* a tela trava e só o conteúdo troca, uma etapa por vez */}
        <div className="sticky top-0 flex min-h-[100svh] items-center py-24">
          <div className="wrap grid w-full items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Titulo className="h-sec max-w-[13ch]" linhas={[<>Do WhatsApp</>, <>ao pergolado</>, <>montado.</>]} />
              <p className="lede mt-6 text-claro-fraco">Cinco etapas. Você acompanha todas.</p>

              {/* barra de avanço: mostra o quanto do processo já passou */}
              <div className="mt-8 hidden h-px w-full max-w-[16rem] bg-white/15 lg:block" aria-hidden="true">
                <motion.span
                  className="block h-px bg-laranja"
                  animate={{ width: `${((ativo + 1) / etapas.length) * 100}%` }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            </div>

            <div className="flex gap-6 lg:gap-10">
              {/* régua de etapas: onde você está sem precisar contar */}
              <div className="flex shrink-0 flex-col justify-center gap-3" aria-hidden="true">
                {etapas.map((e, i) => (
                  <span
                    key={e.n}
                    className={`block w-px transition-all duration-500 ease-exp ${
                      i === ativo ? "h-12 bg-laranja" : "h-7 bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <div className="min-w-0 flex-1 lg:min-h-[24rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={etapa.n}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <Icon name={etapa.icon} size={34} className="text-laranja-claro" />

                    <div className="mt-6 flex items-center gap-3">
                      <span className="font-display text-[0.95rem] tracking-widest text-laranja">{etapa.n}</span>
                      <span className="h-px w-10 bg-white/20" aria-hidden="true" />
                      <span className="font-display text-[0.95rem] tracking-widest text-white/35">
                        / {etapas.length.toString().padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-4 font-display text-[clamp(1.6rem,1.1rem+1.5vw,2.4rem)] uppercase leading-[1.05] text-white">
                      {etapa.title}
                    </h3>
                    <p className="lede mt-5 text-claro-fraco">{etapa.text}</p>

                    <div className="mt-8">
                      <Botao href={waLink(waMessages.processo)} target="_blank" rel="noopener noreferrer" seta>
                        Quero meu orçamento
                      </Botao>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* três detalhes que sempre perguntam */}
      <div className="wrap relative z-conteudo pb-24 md:pb-32">
        <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-3">
          {etapaBullets.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.1 }}
              className="flex items-start gap-4 bg-oficina px-6 py-7"
            >
              <Icon name={b.icon} size={22} className="mt-0.5 shrink-0 text-laranja-claro" />
              <div>
                <p className="font-display text-[1.02rem] uppercase leading-tight text-white">{b.title}</p>
                <p className="mt-1.5 text-[0.86rem] text-claro-fraco">{b.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
