import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Footer } from "../components/Footer";
import { Botao } from "../components/Botao";
import { Titulo } from "../components/Titulo";
import { coberturaLabels, galeriaProjetos, type Cobertura } from "../data/content";
import { waLink, waMessages } from "../lib/whatsapp";

const EASE = [0.16, 1, 0.3, 1] as const;
const filtros: (Cobertura | "todos")[] = ["todos", "simples", "sanduiche", "leitosa", "outras"];

export function Projetos() {
  const [filtro, setFiltro] = useState<Cobertura | "todos">("todos");

  useEffect(() => {
    document.title = "Projetos entregues | Sttilo Móveis";
  }, []);

  const lista = filtro === "todos" ? galeriaProjetos : galeriaProjetos.filter((p) => p.cobertura === filtro);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-header bg-noite/90 py-4 backdrop-blur-lg">
        <div className="wrap flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" aria-label="Sttilo Móveis">
            <img src="/img/logo.png" alt="" className="h-14 w-auto" />
            <span className="hidden font-display text-[1.4rem] leading-none tracking-wider sm:block">
              STTILO
              <span className="mt-1 block font-body text-[0.62rem] tracking-[0.4em] text-claro-fraco">MÓVEIS</span>
            </span>
          </Link>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-display text-[0.92rem] uppercase tracking-wide text-claro-fraco transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Voltar
          </Link>
        </div>
      </header>

      <main className="bg-noite pb-24 pt-32">
        <div className="wrap">
          <div className="text-center">
            <Titulo as="h1" aoCarregar className="h-sec mx-auto max-w-[16ch]" linhas={[<>Trabalhos</>, <>realizados.</>]} />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.28 }}
              className="lede mx-auto mt-6 text-claro-fraco"
            >
              Cada projeto saiu da nossa oficina em Porto Belo e foi instalado pela nossa equipe.
            </motion.p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {filtros.map((f) => (
              <button
                key={f}
                onClick={() => setFiltro(f)}
                className={`px-4 py-2 font-display text-[0.88rem] uppercase tracking-wide transition-colors duration-300 ${
                  filtro === f
                    ? "bg-laranja text-white"
                    : "border border-white/15 text-claro-fraco hover:border-laranja/60 hover:text-white"
                }`}
              >
                {f === "todos" ? "Todos" : coberturaLabels[f]}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {lista.map((p, i) => (
              <motion.article
                key={p.img}
                layout
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: Math.min(i * 0.06, 0.4) }}
                className="group relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={p.img}
                  alt={`${p.legenda}, entregue em ${p.titulo}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-exp group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noite via-noite/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-display text-[1.1rem] uppercase leading-none text-white">{p.titulo}</p>
                  <p className="mt-1.5 text-[0.82rem] text-laranja-claro">{p.legenda}</p>
                </div>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Botao href={waLink(waMessages.galeria)} target="_blank" rel="noopener noreferrer" tamanho="lg" seta>
              Quero um projeto assim
            </Botao>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
