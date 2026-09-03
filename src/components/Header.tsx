import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Botao } from "./Botao";
import { irPara } from "../lib/scroll";
import { useCta } from "../lib/cta";

// ordem da página: projetos, materiais, quem é a Sttilo
const ancoras = [
  { href: "#projetos", label: "Projetos" },
  { href: "#materiais", label: "Materiais" },
  { href: "#sttilo", label: "A Sttilo" },
];

export function Header() {
  const cta = useCta("header");
  const [escondido, setEscondido] = useState(false);
  const [pousado, setPousado] = useState(false);
  const [ativo, setAtivo] = useState<string>("");
  const ultimoY = useRef(0);

  // acompanha a página: some ao descer, volta ao subir, e marca a seção do meio da tela
  useEffect(() => {
    const aoRolar = () => {
      const y = window.scrollY;
      const desceu = y > ultimoY.current;
      setEscondido(desceu && y > 220);
      setPousado(y > 40);
      ultimoY.current = y;

      // a última seção cujo topo já passou do meio da tela é a que está sendo lida
      const meio = window.innerHeight * 0.45;
      let atual = "";
      for (const a of ancoras) {
        const el = document.querySelector(a.href);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= meio && r.bottom > meio) atual = a.href;
      }
      setAtivo(atual);
    };
    window.addEventListener("scroll", aoRolar, { passive: true });
    aoRolar();
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-header transition-[transform,background-color,padding] duration-500 ease-exp ${
        escondido ? "-translate-y-full" : "translate-y-0"
      } ${pousado ? "py-2.5 bg-noite/90 backdrop-blur-lg" : "py-4 bg-transparent"}`}
    >
      <div className="wrap flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Sttilo Móveis">
          <img src="/img/logo.png" alt="" className="h-14 w-auto md:h-16" />
          <span className="hidden sm:block font-display text-[1.4rem] leading-none tracking-wider">
            STTILO
            <span className="block font-body text-[0.62rem] tracking-[0.4em] text-claro-fraco mt-1">MÓVEIS</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {ancoras.map((a) => {
            const on = ativo === a.href;
            return (
              <a
                key={a.href}
                href={a.href}
                onClick={(e) => {
                  e.preventDefault();
                  irPara(a.href);
                }}
                className={`relative py-1 font-display text-[0.98rem] uppercase tracking-wider transition-colors duration-300 ${
                  on ? "text-white" : "text-claro-fraco hover:text-white"
                }`}
              >
                {a.label}
                {/* traço que corre por baixo, cresce do centro */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 -bottom-0.5 h-px w-full bg-laranja origin-center transition-transform duration-500 ease-exp ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <Botao {...cta} className="shrink-0">
          Orçamento
        </Botao>
      </div>
    </header>
  );
}
