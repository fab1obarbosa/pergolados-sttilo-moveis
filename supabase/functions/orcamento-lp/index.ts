// supabase/functions/orcamento-lp/index.ts
//
// Recebe o formulário da rota /orcamento da LP de Pergolados e manda o
// conteúdo por e-mail para a Sttilo, via Resend. Só isso: sem banco, sem
// trigger, sem Notion.
//
// Roda no projeto Supabase da PRÓPRIA STTILO (abzlepannqeokknvtyle), o mesmo
// que já hospeda a notify-lead do Quiz Pergolados. Reusa as mesmas variáveis
// de ambiente do projeto, que são compartilhadas entre as funções:
//   RESEND_API_KEY      chave da conta Resend da Sttilo
//   NOTIFICATION_EMAIL  sttilomoveis@gmail.com
//
// Deploy sem CLI, direto no painel do Supabase da Sttilo:
//   Edge Functions -> Deploy a new function -> Via Editor
//   nome da função: orcamento-lp, cola este arquivo inteiro, Deploy.
//   Depois, nas configurações da função, DESLIGAR o "Verify JWT".
//
// Desligar o Verify JWT é obrigatório: quem chama é o JavaScript público do
// site, sem sessão de usuário. Com ele ligado, toda chamada volta 401 e o
// e-mail nunca sai.
//
// Pelo CLI, o equivalente é:
//   supabase functions deploy orcamento-lp --no-verify-jwt

interface Formulario {
  nome?: string;
  whatsapp?: string;
  cidade?: string;
  investimento?: string;
  prazo?: string;
  tamanho?: string;
  madeira?: string;
  cobertura?: string;
  observacoes?: string;
  utm_source?: string | null;
  utm_campaign?: string | null;
  utm_content?: string | null;
  origem?: string;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(corpo: unknown, status = 200): Response {
  return new Response(JSON.stringify(corpo), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}

function escapeHtml(valor: string): string {
  return valor
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Texto livre chega direto do navegador: corta antes de virar e-mail gigante.
function limpa(valor: unknown, max = 500): string {
  return typeof valor === "string" ? valor.trim().slice(0, max) : "";
}

// O WhatsApp chega mascarado, "(47) 99999-0000". Vira link clicável.
function linkWhatsapp(whatsapp: string): string {
  const digitos = whatsapp.replace(/\D/g, "");
  return `https://wa.me/${digitos.length === 11 ? `55${digitos}` : digitos}`;
}

function dataHora(): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date());
}

function montaHtml(f: Required<Pick<Formulario, "nome" | "whatsapp">> & Formulario): string {
  const linhas: [string, string][] = [
    ["Nome", f.nome],
    ["WhatsApp", f.whatsapp],
    ["Cidade", limpa(f.cidade)],
    ["Investimento", limpa(f.investimento)],
    ["Prazo", limpa(f.prazo)],
    ["Tamanho do projeto", limpa(f.tamanho)],
    ["Madeira", limpa(f.madeira)],
    ["Cobertura", limpa(f.cobertura)],
    ["Observações", limpa(f.observacoes)],
  ];

  const corpo = linhas
    .filter(([, v]) => v !== "" && v !== "Ainda não sei")
    .map(([campo, valor]) =>
      `<tr><td style="padding:6px 12px;color:#F5F4F0;opacity:.7;">${campo}</td>` +
      `<td style="padding:6px 12px;color:#FFFFFF;font-weight:600;">${escapeHtml(valor)}</td></tr>`
    )
    .join("");

  const rodape = [
    limpa(f.origem, 80) || "LP Pergolados",
    f.utm_source ? `Origem: ${escapeHtml(limpa(f.utm_source, 80))}` : null,
    f.utm_campaign ? `Campanha: ${escapeHtml(limpa(f.utm_campaign, 120))}` : null,
    f.utm_content ? `Anúncio: ${escapeHtml(limpa(f.utm_content, 120))}` : null,
  ].filter(Boolean).join(" · ");

  return `
  <div style="font-family:Arial,sans-serif;max-width:480px;margin:0 auto;background:#F5F4F0;border-radius:12px;overflow:hidden;">
    <div style="background:#0D1B4B;padding:24px;">
      <p style="color:#FFFFFF;font-size:13px;letter-spacing:.5px;margin:0 0 4px 0;opacity:.7;">Formulário de orçamento · Pergolados</p>
      <h2 style="color:#FFFFFF;margin:0;font-size:20px;">Novo pedido de orçamento</h2>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#0D1B4B;">${corpo}</table>
    <div style="padding:20px 12px;background:#0D1B4B;">
      <a href="${linkWhatsapp(f.whatsapp)}" style="display:inline-block;background:#E85D24;color:#FFFFFF;font-weight:bold;text-decoration:none;padding:12px 24px;border-radius:8px;">Chamar no WhatsApp</a>
    </div>
    <div style="padding:16px 12px;background:#F5F4F0;">
      <p style="color:#0D1B4B;font-size:12px;margin:0;">${dataHora()}</p>
      <p style="color:#888780;font-size:12px;margin:4px 0 0 0;">${rodape}</p>
    </div>
  </div>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let dados: Formulario;
  try {
    dados = await req.json();
  } catch (err) {
    console.error("orcamento-lp: body inválido:", err);
    return json({ error: "Invalid JSON body" }, 400);
  }

  const nome = limpa(dados.nome, 120);
  const whatsapp = limpa(dados.whatsapp, 24);

  // Nome e WhatsApp são o mínimo para o lead servir para alguma coisa.
  if (nome.length < 2 || whatsapp.replace(/\D/g, "").length < 10) {
    return json({ error: "Nome e WhatsApp são obrigatórios" }, 400);
  }

  const chave = Deno.env.get("RESEND_API_KEY");
  const destino = Deno.env.get("NOTIFICATION_EMAIL");
  if (!chave || !destino) {
    console.error("orcamento-lp: RESEND_API_KEY ou NOTIFICATION_EMAIL ausente nas env vars.");
    return json({ error: "Função sem configuração de e-mail" }, 500);
  }

  const cidade = limpa(dados.cidade, 80);
  try {
    const resposta = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${chave}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Orçamento Pergolados <quiz@sttilomoveis.com>",
        to: destino,
        subject: cidade
          ? `Novo pedido de orçamento: ${nome} · ${cidade}`
          : `Novo pedido de orçamento: ${nome}`,
        html: montaHtml({ ...dados, nome, whatsapp }),
      }),
    });

    if (!resposta.ok) {
      console.error(`orcamento-lp: Resend respondeu ${resposta.status}:`, await resposta.text().catch(() => ""));
      return json({ error: "Falha no envio" }, 502);
    }
  } catch (err) {
    console.error("orcamento-lp: falha ao chamar o Resend:", err);
    return json({ error: "Falha no envio" }, 502);
  }

  return json({ ok: true });
});

// ---------------------------------------------------------------------------
// Self-check: deno run supabase/functions/orcamento-lp/index.ts --self-test
// ---------------------------------------------------------------------------
if (Deno.args?.includes("--self-test")) {
  console.assert(linkWhatsapp("(47) 99999-0000") === "https://wa.me/5547999990000", "linkWhatsapp");
  console.assert(escapeHtml('<b>"x"</b>') === "&lt;b&gt;&quot;x&quot;&lt;/b&gt;", "escapeHtml");
  console.assert(limpa("  oi  ") === "oi" && limpa(null) === "", "limpa");
  console.assert(limpa("abcdef", 3) === "abc", "limpa corta no máximo");

  const html = montaHtml({
    nome: "Maria",
    whatsapp: "(47) 99999-0000",
    cidade: "Itapema",
    madeira: "Ainda não sei",
    observacoes: "",
  });
  console.assert(html.includes(">Cidade<"), "cidade preenchida deveria aparecer");
  console.assert(!html.includes(">Madeira<"), '"Ainda não sei" não pode virar linha do e-mail');
  console.assert(!html.includes(">Observações<"), "campo vazio não pode virar linha do e-mail");
  console.log("orcamento-lp: self-test OK");
}
