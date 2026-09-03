# Supabase da LP Pergolados

Uma função só: **`orcamento-lp`**. Ela recebe o formulário da rota `/orcamento`
e manda o conteúdo por e-mail para a Sttilo via Resend. Sem tabela, sem
trigger, sem RLS.

## Onde ela mora

No projeto Supabase da **própria Sttilo**, `abzlepannqeokknvtyle`, o mesmo que
já roda a `notify-lead` do Quiz Pergolados. Nunca no Supabase da Edge.

Ela reaproveita as variáveis de ambiente que já estão configuradas nesse
projeto (são compartilhadas entre todas as funções):

| Variável | Valor |
|---|---|
| `RESEND_API_KEY` | chave da conta Resend da Sttilo |
| `NOTIFICATION_EMAIL` | `sttilomoveis@gmail.com` |

Se as duas já estão de pé para a `notify-lead`, não há nada a configurar.

## Deploy pelo painel (jeito usado, sem CLI)

Tudo no navegador, dentro da conta Supabase da Sttilo. Não precisa instalar
nem conectar nada.

1. Abrir o projeto `abzlepannqeokknvtyle` (o mesmo do Quiz Pergolados).
2. Menu lateral: **Edge Functions** → **Deploy a new function** → **Via Editor**.
3. Nome da função: **`orcamento-lp`**, exatamente assim. O nome vira a URL, e a
   URL está fixa no site (`src/lib/formulario.ts`). Nome diferente quebra.
4. Apagar o exemplo que vem no editor e colar o conteúdo inteiro de
   `supabase/functions/orcamento-lp/index.ts`. É um arquivo só, sem import de
   pacote nenhum, então cola e pronto.
5. **Deploy**.
6. Entrar na função recém-criada → **Settings** (ou o ícone de engrenagem) →
   **desligar o "Verify JWT"**. Esse passo não é opcional: quem chama a função é
   o JavaScript público do site, sem sessão de usuário. Com o Verify JWT ligado,
   toda chamada volta 401 e o e-mail nunca sai.

### Conferir os secrets

Em **Edge Functions → Secrets**, as duas variáveis abaixo já devem estar lá,
porque a `notify-lead` do quiz usa as mesmas. Se estiverem, não há o que fazer.

| Variável | Valor |
|---|---|
| `RESEND_API_KEY` | chave da conta Resend da Sttilo |
| `NOTIFICATION_EMAIL` | `sttilomoveis@gmail.com` |

### Testar

O jeito mais simples é o próprio site: abrir
`https://pergolados.sttilomoveis.com/orcamento`, preencher e enviar. Chegando
e-mail em `sttilomoveis@gmail.com`, está funcionando.

Pelo terminal, se preferir:

```bash
curl -X POST https://abzlepannqeokknvtyle.supabase.co/functions/v1/orcamento-lp -H "Content-Type: application/json" -d '{"nome":"Teste","whatsapp":"(47) 99999-0000","cidade":"Porto Belo"}'
```

Resposta esperada: `{"ok":true}`. Se voltar `401`, o Verify JWT ficou ligado
(passo 6). Se voltar `500` com "Função sem configuração de e-mail", falta um
dos dois secrets.

## Deploy pelo CLI (alternativa)

Só se um dia for mais prático. Precisa estar logado na conta Supabase da
Sttilo, que é a do cliente, não a da Edge:

```bash
supabase login
supabase link --project-ref abzlepannqeokknvtyle
supabase functions deploy orcamento-lp --no-verify-jwt
```

## Enquanto ela não estiver no ar

O formulário não quebra. O envio do e-mail é o registro; o caminho da pessoa é
o botão de WhatsApp que aparece depois de enviar, já com todas as respostas
montadas na mensagem. Se a função não responder, a tela final aparece do mesmo
jeito e o lead chega pelo WhatsApp, só não fica o e-mail.

## Self-check da função

```bash
deno run supabase/functions/orcamento-lp/index.ts --self-test
```
