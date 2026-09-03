import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Botao } from "../components/Botao";
import { Titulo } from "../components/Titulo";
import { Icon } from "../components/Icon";
import { FundoSecao } from "../components/FundoSecao";
import { ctaBullets } from "../data/content";
import { trackFormStart, trackLead } from "../lib/track";
import {
  COBERTURA_OPCOES,
  INVESTIMENTO_OPCOES,
  LOCAL_OPCOES,
  MADEIRA_OPCOES,
  PRAZO_OPCOES,
  camposFaltando,
  dadosVazios,
  enviarOrcamento,
  lerUtm,
  linkWhatsappOrcamento,
  mascaraTelefone,
  primeiroNome,
  type DadosOrcamento,
} from "../lib/formulario";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ---------------------------------------------------------------
   Peças do formulário. Canto vivo e régua laranja, como o resto da
   página: o formulário é parte do site, não um bloco colado nele.
   --------------------------------------------------------------- */

function Campo({
  id,
  rotulo,
  dica,
  erro,
  children,
}: {
  id: string;
  rotulo: string;
  dica?: string;
  erro?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-display text-[1rem] uppercase tracking-wide text-white">
        {rotulo}
      </label>
      {dica && <p className="mt-1 text-[0.84rem] text-claro-fraco">{dica}</p>}
      <div className="mt-3">{children}</div>
      {erro && (
        <p className="mt-2 text-[0.82rem] text-laranja-claro" role="alert">
          {erro}
        </p>
      )}
    </div>
  );
}

const classeInput =
  "w-full rounded-sm border border-white/20 bg-white/[0.04] px-4 py-3.5 text-[1rem] text-white " +
  "placeholder:text-claro-fraco/55 transition-colors duration-300 focus:border-laranja focus:outline-none";

function Opcoes({
  nome,
  opcoes,
  valor,
  aoEscolher,
  colunas = 2,
}: {
  nome: string;
  opcoes: readonly { label: string; desc?: string }[];
  valor: string;
  aoEscolher: (v: string) => void;
  colunas?: 1 | 2;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={nome}
      className={`grid gap-2.5 ${colunas === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {opcoes.map((o) => {
        const on = valor === o.label;
        return (
          <button
            key={o.label}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => aoEscolher(on ? "" : o.label)}
            className={`rounded-sm border px-4 py-3 text-left transition-colors duration-300 ${
              on
                ? "border-laranja bg-laranja/15 text-white"
                : "border-white/15 bg-white/[0.03] text-claro-fraco hover:border-white/40 hover:text-white"
            }`}
          >
            <span className="block font-display text-[1rem] uppercase leading-tight tracking-wide">{o.label}</span>
            {o.desc && <span className="mt-1 block text-[0.8rem] leading-snug opacity-75">{o.desc}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------------
   Seção
   --------------------------------------------------------------- */

export function Formulario() {
  const [dados, setDados] = useState<DadosOrcamento>(dadosVazios);
  const [tentou, setTentou] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [pronto, setPronto] = useState(false);
  const comecou = useRef(false);

  const faltando = camposFaltando(dados);
  const falta = (campo: keyof DadosOrcamento) => tentou && faltando.includes(campo);

  const muda = (patch: Partial<DadosOrcamento>) => {
    if (!comecou.current) {
      comecou.current = true;
      trackFormStart();
    }
    setDados((d) => ({ ...d, ...patch }));
  };

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setTentou(true);
    if (faltando.length > 0) {
      document.getElementById(`campo-${faltando[0]}`)?.focus();
      return;
    }
    setEnviando(true);
    // O e-mail é o registro; o WhatsApp é o caminho da pessoa. Se o envio
    // falhar, ela segue para o WhatsApp com tudo preenchido do mesmo jeito.
    await enviarOrcamento(dados, lerUtm(window.location.search));
    trackLead("Formulário de orçamento");
    setEnviando(false);
    setPronto(true);
  }

  return (
    <section id="formulario" className="relative scroll-mt-24 overflow-hidden py-24 md:py-32">
      <FundoSecao
        src="/img/fundo-02.webp"
        opacidade={0.42}
        veu="linear-gradient(180deg, rgba(10,19,48,.93) 0%, rgba(10,19,48,.86) 50%, rgba(10,19,48,.95) 100%)"
      />

      <div className="wrap relative z-conteudo">
        {pronto ? (
          <div className="mx-auto max-w-[46rem] text-center">
            <Titulo
              className="h-sec mx-auto max-w-[20ch]"
              linhas={[<>Prontinho, {primeiroNome(dados.nome)}.</>, <>Suas respostas já foram.</>]}
            />
            <p className="lede mx-auto mt-8 text-claro-fraco">
              A equipe já recebeu tudo por e-mail. Agora é só continuar no WhatsApp para receber o orçamento com
              peças, medidas e condições.
            </p>
            <div className="mt-10">
              <Botao
                href={linkWhatsappOrcamento(dados)}
                target="_blank"
                rel="noopener noreferrer"
                tamanho="lg"
                seta
              >
                Continuar no WhatsApp
              </Botao>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-auto max-w-[46rem] text-center">
              <Titulo className="h-sec mx-auto max-w-[20ch]" linhas={[<>Monte seu</>, <>orçamento aqui.</>]} />
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
                className="lede mx-auto mt-8 text-claro-fraco"
              >
                Responda o que já sabe. O que ainda não decidiu, a equipe resolve com você. Orçamento e visita
                técnica não têm custo.
              </motion.p>
            </div>

            <form onSubmit={enviar} noValidate className="mx-auto mt-16 max-w-[46rem]">
              {/* ---------- Seção 1 ---------- */}
              <div className="regua text-laranja-claro" aria-hidden="true" />
              <h3 className="mt-5 font-display text-[1.5rem] uppercase text-white">
                <span className="text-laranja">01</span> Sobre você e o projeto
              </h3>

              <div className="mt-8 grid gap-8">
                <Campo
                  id="campo-nome"
                  rotulo="Como você se chama?"
                  erro={falta("nome") ? "Escreve seu nome, por favor." : undefined}
                >
                  <input
                    id="campo-nome"
                    className={classeInput}
                    type="text"
                    autoComplete="given-name"
                    placeholder="Digite seu nome"
                    value={dados.nome}
                    onChange={(e) => muda({ nome: e.target.value })}
                  />
                </Campo>

                <Campo
                  id="campo-whatsapp"
                  rotulo="Qual o seu WhatsApp?"
                  dica="É por aqui que a gente manda seu orçamento."
                  erro={falta("whatsapp") ? "Precisa ter DDD e 9 números, tipo (47) 99999-0000." : undefined}
                >
                  <input
                    id="campo-whatsapp"
                    className={classeInput}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel-national"
                    maxLength={15}
                    placeholder="(47) 00000-0000"
                    value={dados.whatsapp}
                    onChange={(e) => muda({ whatsapp: mascaraTelefone(e.target.value) })}
                  />
                </Campo>

                <Campo
                  id="campo-cidade"
                  rotulo="Em qual cidade é o projeto?"
                  dica="A gente atende Porto Belo e toda a região."
                  erro={falta("cidade") ? "Escreve o nome da cidade, por favor." : undefined}
                >
                  <input
                    id="campo-cidade"
                    className={classeInput}
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Ex: Porto Belo"
                    value={dados.cidade}
                    onChange={(e) => muda({ cidade: e.target.value })}
                  />
                </Campo>

                <Campo
                  id="campo-investimento"
                  rotulo="Quanto você pretende investir no projeto?"
                  dica="O valor depende do tamanho. Isso ajuda a equipe a indicar o material ideal."
                  erro={falta("investimento") ? "Escolhe uma faixa, por favor." : undefined}
                >
                  <Opcoes
                    nome="Faixa de investimento"
                    opcoes={INVESTIMENTO_OPCOES}
                    valor={dados.investimento}
                    aoEscolher={(v) => muda({ investimento: v })}
                  />
                </Campo>

                <Campo
                  id="campo-prazo"
                  rotulo="Qual sua ideia de prazo?"
                  erro={falta("prazo") ? "Escolhe um prazo, por favor." : undefined}
                >
                  <Opcoes
                    nome="Prazo do projeto"
                    opcoes={PRAZO_OPCOES}
                    valor={dados.prazo}
                    aoEscolher={(v) => muda({ prazo: v })}
                  />
                </Campo>

                <Campo
                  id="campo-tamanho"
                  rotulo="Qual o tamanho aproximado do seu projeto?"
                  dica="Se ainda não mediu, um valor aproximado já ajuda."
                  erro={falta("tamanho") ? "Escreve uma medida aproximada, por favor." : undefined}
                >
                  <input
                    id="campo-tamanho"
                    className={classeInput}
                    type="text"
                    placeholder="Ex: 5 x 3 metros (largura x comprimento)"
                    value={dados.tamanho}
                    onChange={(e) => muda({ tamanho: e.target.value })}
                  />
                </Campo>
              </div>

              {/* ---------- Seção 2 ---------- */}
              <div className="regua mt-16 text-laranja-claro" aria-hidden="true" />
              <h3 className="mt-5 font-display text-[1.5rem] uppercase text-white">
                <span className="text-laranja">02</span> Material e acabamento
              </h3>
              <p className="mt-3 max-w-[52ch] text-[0.92rem] text-claro-fraco">
                Nada aqui é obrigatório. Marque só o que já está decidido, ou deixe em branco que a equipe monta as
                opções com você.
              </p>

              <div className="mt-8 grid gap-8">
                <Campo id="campo-madeira" rotulo="Qual madeira você tem em mente?">
                  <Opcoes
                    nome="Madeira"
                    opcoes={MADEIRA_OPCOES}
                    valor={dados.madeira}
                    aoEscolher={(v) => muda({ madeira: v })}
                  />
                </Campo>

                <Campo id="campo-cobertura" rotulo="E a cobertura (telha)?">
                  <Opcoes
                    nome="Cobertura"
                    opcoes={COBERTURA_OPCOES}
                    valor={dados.cobertura}
                    aoEscolher={(v) => muda({ cobertura: v })}
                  />
                </Campo>

                <Campo id="campo-local" rotulo="Onde o pergolado vai ficar?">
                  <Opcoes
                    nome="Local do pergolado"
                    opcoes={LOCAL_OPCOES.map((l) => ({ label: l }))}
                    valor={dados.local}
                    aoEscolher={(v) => muda({ local: v })}
                  />
                </Campo>

                <Campo
                  id="campo-observacoes"
                  rotulo="Quer contar mais alguma coisa?"
                  dica="Altura do pé direito, caimento, detalhe do espaço, qualquer coisa que ajude."
                >
                  <textarea
                    id="campo-observacoes"
                    className={`${classeInput} min-h-[7rem] resize-y`}
                    placeholder="Opcional"
                    value={dados.observacoes}
                    onChange={(e) => muda({ observacoes: e.target.value })}
                  />
                </Campo>
              </div>

              {/* adendo pedido: cor não é escolha de agora */}
              <p className="mt-10 border-l-2 border-laranja bg-white/[0.04] px-5 py-4 text-[0.92rem] leading-relaxed text-claro-fraco">
                As cores da telha e do verniz já estão inclusas no orçamento, sem custo adicional. Você escolhe as
                duas na hora de assinar o contrato, com calma e com a equipe do lado.
              </p>

              {tentou && faltando.length > 0 && (
                <p className="mt-8 text-[0.92rem] text-laranja-claro" role="alert">
                  Faltou preencher {faltando.length === 1 ? "um campo" : `${faltando.length} campos`} da parte 01.
                </p>
              )}

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={enviando}
                  className="group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-sm bg-laranja px-9 py-4 font-display text-[1.05rem] font-semibold uppercase tracking-wide text-white transition-opacity duration-300 disabled:opacity-70"
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 origin-bottom scale-y-0 bg-[#c9491a] transition-transform duration-400 ease-exp group-hover:scale-y-100"
                  />
                  <span className="relative z-10">{enviando ? "Enviando..." : "Enviar e falar no WhatsApp"}</span>
                </button>
              </div>

              <ul className="mt-12 flex flex-wrap gap-x-10 gap-y-5">
                {ctaBullets.map((b) => (
                  <li key={b.label} className="flex items-center gap-2.5 text-[0.9rem] text-claro-fraco">
                    <Icon name={b.icon} size={18} className="text-laranja-claro" />
                    {b.label}
                  </li>
                ))}
              </ul>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
