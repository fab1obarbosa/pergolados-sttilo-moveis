import { motion, useReducedMotion } from "framer-motion";
import { Botao } from "../components/Botao";
import { Titulo } from "../components/Titulo";
import { Icon } from "../components/Icon";
import { Pergolado3D } from "../components/Pergolado3D";
import { irPara } from "../lib/scroll";
import { waLink, waMessages } from "../lib/whatsapp";
import { heroBullets } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduzido = useReducedMotion();

  return (
    <section className="relative bg-noite overflow-hidden">
      <div className="serra-clara absolute inset-0 z-fundo opacity-70" aria-hidden="true" />

      <div className="wrap relative z-conteudo grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 lg:pt-28">
        <div>
          <Titulo
            as="h1"
            aoCarregar
            className="h-hero"
            linhas={[
              <>Sombra onde hoje</>,
              <>
                só bate <span className="text-laranja-claro">sol.</span>
              </>,
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.34 }}
            className="lede mt-7 text-claro-fraco"
          >
            Pergolados sob medida em madeira de lei. A gente fabrica na nossa oficina em Porto Belo e instala com a
            nossa própria equipe, sem terceirizar nada.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.46 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Botao href={waLink(waMessages.hero)} target="_blank" rel="noopener noreferrer" tamanho="lg" seta>
              Quero meu orçamento
            </Botao>
            <Botao
              href="#projetos"
              variante="linha"
              tamanho="lg"
              onClick={(e) => {
                e.preventDefault();
                irPara("#projetos");
              }}
            >
              Ver projetos
            </Botao>
          </motion.div>

          {/* régua de obra separando a promessa das garantias */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.6 }}
            className="regua mt-12 origin-left text-laranja-claro"
            aria-hidden="true"
          />

          <ul className="mt-6 flex flex-wrap gap-x-9 gap-y-4">
            {heroBullets.map((b, i) => (
              <motion.li
                key={b.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.68 + i * 0.09 }}
                className="flex items-center gap-2.5 text-[0.88rem] text-claro-fraco"
              >
                <Icon name={b.icon} size={17} className="text-laranja-claro" />
                {b.label}
              </motion.li>
            ))}
          </ul>
        </div>

        {/* lado direito: a montagem do pergolado em 3D, em loop */}
        <motion.div
          initial={reduzido ? { opacity: 0 } : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="relative"
        >
          {/* clarão atrás da peça: é o que dá profundidade e cola a estrutura no fundo */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-[-18%] -z-10"
            style={{
              background:
                "radial-gradient(58% 52% at 50% 40%, rgba(31,72,140,.62) 0%, rgba(16,42,99,.34) 42%, rgba(10,19,48,0) 72%)",
            }}
          />

          <div className="relative aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-auto lg:h-[min(82vh,760px)]">
            <Pergolado3D className="absolute inset-0" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
