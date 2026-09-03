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

## Deploy

Precisa estar logado na conta Supabase da Sttilo (a conta do cliente, não a da
Edge):

```bash
cd "10 - CLIENTES/Sttilo Moveis/03 - Entregas/LP Pergolados"
supabase login
supabase link --project-ref abzlepannqeokknvtyle
supabase functions deploy orcamento-lp --no-verify-jwt
```

O `--no-verify-jwt` é obrigatório: quem chama a função é o JavaScript público
do site, sem sessão de usuário.

Para conferir depois do deploy:

```bash
curl -X POST https://abzlepannqeokknvtyle.supabase.co/functions/v1/orcamento-lp \
  -H "Content-Type: application/json" \
  -d '{"nome":"Teste","whatsapp":"(47) 99999-0000","cidade":"Porto Belo"}'
```

Resposta esperada: `{"ok":true}` e um e-mail em `sttilomoveis@gmail.com`.

## Enquanto ela não estiver no ar

O formulário não quebra. O envio do e-mail é o registro; o caminho da pessoa é
o botão de WhatsApp que aparece depois de enviar, já com todas as respostas
montadas na mensagem. Se a função não responder, a tela final aparece do mesmo
jeito e o lead chega pelo WhatsApp, só não fica o e-mail.

## Self-check da função

```bash
deno run supabase/functions/orcamento-lp/index.ts --self-test
```
