/**
 * formulario.ts — Opções, validação, envio e mensagem final do formulário de
 * orçamento da rota /orcamento.
 *
 * Seção 1 repete as 6 perguntas do Quiz Pergolados (mesmos rótulos e mesmos
 * valores gravados), para que os dois canais cheguem no WhatsApp da Sttilo
 * falando a mesma língua. Seção 2 é sobre material e é toda opcional: quem
 * ainda não decidiu marca "Ainda não sei" ou deixa em branco.
 */

/* ============================================================
   Seção 1 — as mesmas perguntas do quiz
   ============================================================ */

export const INVESTIMENTO_OPCOES = [
  { label: "De R$5 mil a R$8 mil", value: "5 a 8 mil" },
  { label: "De R$8 mil a R$12 mil", value: "8 a 12 mil" },
  { label: "De R$12 mil a R$15 mil", value: "12 a 15 mil" },
  { label: "Acima de R$15 mil", value: "Acima de 15 mil" },
] as const;

export const PRAZO_OPCOES = [
  { label: "Para agora", desc: "já quero entrar na lista de produção", value: "Para agora" },
  { label: "Para o próximo mês", desc: "não tenho tanta pressa", value: "Próximo mês" },
  { label: "Para os próximos 3 meses", desc: "ainda estou avaliando", value: "Próximos 3 meses" },
  { label: "Só estou pesquisando", desc: "sem data definida", value: "Só pesquisando" },
] as const;

/* ============================================================
   Seção 2 — material, tudo opcional
   ============================================================ */

/** Marcado quando a pessoa ainda não decidiu. Não vai pro e-mail nem pro WhatsApp. */
export const NAO_SEI = "Ainda não sei";

export const MADEIRA_OPCOES = [
  { label: "Pinus Tratado", desc: "custo benefício, 15 anos de garantia" },
  { label: "Angelim Pedra", desc: "madeira nobre, tom avermelhado" },
  { label: "Grapia", desc: "topo em madeira nobre" },
  { label: "Madeira Ecológica", desc: "sem verniz e sem manutenção" },
  { label: NAO_SEI, desc: "quero a orientação da equipe" },
] as const;

export const COBERTURA_OPCOES = [
  { label: "Aluzinco Simples", desc: "chapa única, a mais em conta" },
  { label: "Aluzinco Sanduíche", desc: "duas chapas com isolamento térmico" },
  { label: "Fibropolipropileno Leitosa", desc: "passa luz sem esquentar o ambiente" },
  { label: "Só a estrutura, sem cobertura", desc: "pergolado aberto" },
  { label: NAO_SEI, desc: "quero a orientação da equipe" },
] as const;

export const LOCAL_OPCOES = [
  "Garagem",
  "Área gourmet ou churrasqueira",
  "Piscina ou spa",
  "Varanda ou sacada",
  "Jardim ou quintal",
  "Outro lugar",
  NAO_SEI,
] as const;

/* ============================================================
   Estado
   ============================================================ */

export interface DadosOrcamento {
  nome: string;
  whatsapp: string;
  cidade: string;
  investimento: string;
  prazo: string;
  tamanho: string;
  madeira: string;
  cobertura: string;
  local: string;
  observacoes: string;
}

export const dadosVazios: DadosOrcamento = {
  nome: "",
  whatsapp: "",
  cidade: "",
  investimento: "",
  prazo: "",
  tamanho: "",
  madeira: "",
  cobertura: "",
  local: "",
  observacoes: "",
};

/* ============================================================
   Validação (só a seção 1 trava o envio)
   ============================================================ */

/** (00) 00000-0000 conforme a pessoa digita. */
export function mascaraTelefone(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function telefoneValido(valor: string): boolean {
  return valor.replace(/\D/g, "").length === 11;
}

export function textoValido(valor: string): boolean {
  return valor.trim().length >= 2;
}

/** Campos da seção 1 que faltam preencher. Vazio = pode enviar. */
export function camposFaltando(d: DadosOrcamento): (keyof DadosOrcamento)[] {
  const faltando: (keyof DadosOrcamento)[] = [];
  if (!textoValido(d.nome)) faltando.push("nome");
  if (!telefoneValido(d.whatsapp)) faltando.push("whatsapp");
  if (!textoValido(d.cidade)) faltando.push("cidade");
  if (!d.investimento) faltando.push("investimento");
  if (!d.prazo) faltando.push("prazo");
  if (!textoValido(d.tamanho)) faltando.push("tamanho");
  return faltando;
}

export function primeiroNome(nome: string): string {
  return nome.trim().split(/\s+/)[0] || "";
}

/* ============================================================
   Envio: e-mail para a Sttilo via Resend
   ============================================================ */

/**
 * Edge Function no Supabase da PRÓPRIA STTILO (nunca o da Edge), a mesma conta
 * que já roda a notify-lead do Quiz Pergolados e a mesma chave do Resend.
 * Deploy: ver supabase/README.md deste projeto.
 */
export const ENDPOINT_ORCAMENTO =
  "https://abzlepannqeokknvtyle.supabase.co/functions/v1/orcamento-lp";

/** Origem do visitante, quando o anúncio marcou a URL. */
export function lerUtm(search: string) {
  const p = new URLSearchParams(search);
  return {
    utm_source: p.get("utm_source"),
    utm_campaign: p.get("utm_campaign"),
    utm_content: p.get("utm_content"),
  };
}

/**
 * Manda os dados para o e-mail da Sttilo. Devolve true/false, mas quem chama
 * nunca deve travar a pessoa por causa disso: o WhatsApp com o resumo é o
 * caminho principal, o e-mail é o registro.
 */
export async function enviarOrcamento(
  dados: DadosOrcamento,
  utm: ReturnType<typeof lerUtm>,
): Promise<boolean> {
  try {
    const resposta = await fetch(ENDPOINT_ORCAMENTO, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...dados, ...utm, origem: "LP Pergolados /orcamento" }),
    });
    return resposta.ok;
  } catch {
    return false;
  }
}

/* ============================================================
   Mensagem final do WhatsApp
   ============================================================ */

const WHATSAPP_STTILO = "5547991190524";

/** Linha some quando o campo está vazio ou marcado como "Ainda não sei". */
function preenchido(valor: string): boolean {
  return valor.trim() !== "" && valor !== NAO_SEI;
}

export function linkWhatsappOrcamento(d: DadosOrcamento): string {
  const linhas = ["Olá! Preenchi o formulário de orçamento no site."];

  const quem = [d.nome.trim(), d.cidade.trim()].filter(Boolean);
  if (quem.length === 2) linhas.push(`Sou ${quem[0]}, de ${quem[1]}.`);
  else if (quem.length === 1) linhas.push(`Sou ${quem[0]}.`);

  if (preenchido(d.tamanho)) linhas.push(`Projeto de aproximadamente ${d.tamanho.trim()}.`);
  if (preenchido(d.investimento)) linhas.push(`Investimento previsto: ${d.investimento}.`);
  if (preenchido(d.prazo)) linhas.push(`Prazo: ${d.prazo}.`);
  if (preenchido(d.local)) linhas.push(`Vai ficar em: ${d.local}.`);
  if (preenchido(d.madeira)) linhas.push(`Madeira: ${d.madeira}.`);
  if (preenchido(d.cobertura)) linhas.push(`Cobertura: ${d.cobertura}.`);
  if (preenchido(d.observacoes)) linhas.push(`Observações: ${d.observacoes.trim()}`);

  return `https://wa.me/${WHATSAPP_STTILO}?text=${encodeURIComponent(linhas.join("\n"))}`;
}
