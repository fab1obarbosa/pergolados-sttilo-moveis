import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Titulo } from "../components/Titulo";
import { cidades } from "../data/content";

const EASE = [0.16, 1, 0.3, 1] as const;

/** cidades marcadas no painel, com posição aproximada no recorte do litoral */
const pinos = [
  { nome: "Porto Belo", x: 55, y: 50, origem: true },
  { nome: "Bombinhas", x: 72, y: 57 },
  { nome: "Itapema", x: 60, y: 39 },
  { nome: "Balneário Camboriú", x: 64, y: 27 },
  { nome: "Itajaí", x: 62, y: 17 },
  { nome: "Tijucas", x: 41, y: 57 },
  { nome: "Brusque", x: 36, y: 30 },
  { nome: "Blumenau", x: 26, y: 18 },
  { nome: "Nova Trento", x: 25, y: 47 },
  { nome: "São José", x: 40, y: 78 },
  { nome: "Florianópolis", x: 57, y: 79 },
  { nome: "Palhoça", x: 36, y: 88 },
];

export function Atendimento() {
  return (
    <section className="relative bg-carvao">
      <div className="wrap relative z-conteudo grid items-center gap-14 py-24 md:py-32 lg:grid-cols-[1.05fr_0.95fr]">
        {/* painel de mapa */}
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative aspect-[5/4] overflow-hidden border border-white/12 bg-noite"
        >
          {/* curvas de nível, como carta topográfica */}
          <svg viewBox="0 0 100 80" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <path
                key={i}
                d={`M-5 ${12 + i * 9} Q 22 ${4 + i * 9} 45 ${14 + i * 9} T 105 ${9 + i * 9}`}
                fill="none"
                stroke="#F4A256"
                strokeOpacity={0.11}
                strokeWidth="0.4"
              />
            ))}
            {/* linha da costa */}
            <path
              d="M78 -4 Q 70 14 74 26 Q 79 38 70 48 Q 62 58 66 70 Q 69 78 64 84"
              fill="none"
              stroke="#F4A256"
              strokeOpacity="0.4"
              strokeWidth="0.7"
            />
          </svg>

          {pinos.map((p, i) => (
            <motion.span
              key={p.nome}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: EASE, delay: 0.25 + i * 0.06 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              {p.origem ? (
                <span className="relative flex items-center gap-2 bg-laranja px-3 py-1.5">
                  <span className="absolute -inset-1 -z-10 bg-laranja/50 animate-pulso-pino" aria-hidden="true" />
                  <MapPin size={13} className="text-white" />
                  <span className="font-display text-[0.78rem] uppercase tracking-wide text-white">{p.nome}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 border border-white/15 bg-white/[0.07] px-2.5 py-1 backdrop-blur-sm">
                  <MapPin size={11} className="text-laranja-claro" />
                  <span className="whitespace-nowrap text-[0.7rem] text-white/85">{p.nome}</span>
                </span>
              )}
            </motion.span>
          ))}
        </motion.div>

        {/* texto e lista */}
        <div>
          <Titulo className="h-sec max-w-[16ch]" linhas={[<>Porto Belo é a base.</>, <>A região toda é</>, <>o atendimento.</>]} />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.14 }}
            className="lede mt-6 text-claro-fraco"
          >
            Residimos em Porto Belo e atendemos praticamente toda a região de Santa Catarina. Não achou a sua cidade?
            Pergunte, quase sempre dá para atender.
          </motion.p>

          <div className="mt-9 flex flex-wrap gap-x-2 gap-y-2.5">
            {cidades.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: EASE, delay: Math.min(i * 0.03, 0.45) }}
                className={`px-3 py-1.5 text-[0.82rem] transition-colors duration-300 ${
                  i === 0
                    ? "bg-laranja font-medium text-white"
                    : "border border-white/15 text-claro-fraco hover:border-laranja/60 hover:text-white"
                }`}
              >
                {c}
              </motion.span>
            ))}

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, ease: EASE, delay: 0.5 }}
              className="px-3 py-1.5 text-[0.82rem] font-medium text-laranja-claro"
            >
              E muito mais cidades
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
