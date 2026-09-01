# LP Pergolados — Sttilo Móveis

Aplicação de landing page em React, não página estática. Stack: Vite + React 18 +
TypeScript + Tailwind CSS + Framer Motion (reveals, scroll-scrub, animação do
pergolado) + Lenis (smooth scroll) + Embla Carousel (galeria de projetos) +
React Router (rotas `/` e `/projetos`).

## Rodar localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173` (ou a porta que o Vite escolher).

## Build de produção

```bash
npm run build
```

Gera a pasta `dist/` pronta para deploy estático (Hostgator, Vercel, Netlify,
qualquer servidor de arquivo estático). `npm run preview` serve o build local
para conferência antes do deploy.

## Estrutura

```
src/
  components/   Header, botão de WhatsApp flutuante, botão padrão, poeira flutuante,
                animação do pergolado (traço se desenhando em SVG), wrapper de reveal
  sections/     cada seção da home (dor, solução/projetos, como funciona, materiais,
                verniz, telhas, cores de telha, sobre/cidades, FAQ, CTA final)
  pages/        Home.tsx e Projetos.tsx (galeria com carrossel Embla + filtro)
  data/         todo o conteúdo (copy, materiais, cores, cidades, FAQ, projetos)
  lib/          link de WhatsApp com mensagem por origem, variantes de animação
  hooks/        useLenis (smooth scroll, desliga com prefers-reduced-motion)
```

## Pendências (fora do escopo de código)

- Fotos reais de projetos entregues, fábrica e equipe (hoje são placeholders em SVG)
- Avaliações reais do Google
- Cores reais de telha do fornecedor
- ID do Meta Pixel e do GA4
- Definir domínio/subdomínio e pipeline de deploy
