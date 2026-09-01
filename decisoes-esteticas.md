# Decisões estéticas — LP Pergolados (Sttilo Móveis)

> Preenchidas antes de abrir o editor, conforme `11 - PROCESSOS/criacao-visual-de-sites.md`.
> Registro de queimados até aqui: 1 entrada (LP de captação, diagnostico.edgecompany.com.br,
> ago/2026 — imersa em navy, foto documental duotone, canvas de vetores acelerando com
> rolagem, assimétrica em diagonal). Esta página diverge em cor, imagem, movimento e
> composição — 4 das 6 colunas.

1. **Cena física:** dono de casa chega em casa no fim da tarde de sábado, luz baixa e
   quente, olha pro quintal com a churrasqueira pronta e nenhuma sombra, decide ali que
   esse ano a área vai ficar coberta. Luz de golden hour sobre estrutura de madeira decide
   por escuro dominante com quente entrando pela luz, não pelo fundo.

2. **Pista estética nomeada:** prancha técnica de montagem de marcenaria. Traço fino
   branco e laranja sobre navy, régua, esquadro, vista explodida de peça por peça, tipo
   manual de montagem de móvel de marceneiro, não manual de móvel de loja. Teste inverso:
   um concorrente descreveria o site dele como "página moderna e elegante sobre
   pergolados". Este é "o manual de montagem que se desenha sozinho na tela".

3. **Estratégia de cor:** paleta cheia, 4 papéis nomeados — navy dominante (fundo),
   laranja (destaque e CTA, máximo dois pontos por tela), preto (faixas de quebra),
   cinza claro (uma seção de respiro, S4). Sem gradiente em texto, sem vidro fosco
   decorativo.

4. **O que carrega a imagem:** desenho técnico em SVG (vista explodida do pergolado se
   montando) é o material decisivo, não foto. Fotos reais de projeto entregue, fábrica e
   textura de madeira entram como material de apoio em slots marcados, para o Fabio
   substituir por imagem real (ver seção 7 do prompt-lp-pergolados-sttilo.md).

5. **Movimento assinatura:** o pergolado se monta peça por peça em SVG, uma sequência só,
   dentro do hero: colunas sobem, encaixe aparece, travessas entram nos encaixes, vigas
   se apoiam nas travessas com encaixe próprio, telha desce e recebe a pintura amadeirada,
   verniz passa em varredura sobre a madeira. Roda uma vez, ativado por
   `IntersectionObserver`. Nenhuma outra seção repete esse efeito.

6. **Lógica de composição:** faixa de largura total alternando com coluna estreita de
   60 a 70 caracteres, alinhamento à esquerda como padrão. Sem grid de 3 cards repetido.

**Fonte:** stack de sistema (sem CDN, sem arquivo de fonte próprio ainda).
`ponytail: sem .woff2 self-hosted da Barlow Condensed/Poppins, ativar quando o Fabio
aprovar a troca de família tipográfica também na LP Madeiras (mesma pendência registrada
lá).`
