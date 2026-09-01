export const empresa = {
  nome: "Sttilo Móveis LTDA",
  cnpj: "58.389.282/0001-40",
  endereco: "Rua Antonio Francisco Gomes, 141 · Perequê, Porto Belo, SC",
  instagram: "https://www.instagram.com/sttilo.moveis/",
  facebook: "https://www.facebook.com/sttilomoveismdf",
  google: "https://share.google/CFkzpc02Mt5BHnoNA",
};

export const heroBullets = [
  { icon: "factory", label: "Fabricação própria" },
  { icon: "hammer", label: "Instalação com equipe própria" },
  { icon: "shield", label: "Madeiras selecionadas de extrema qualidade e garantia" },
];

export const dores = [
  {
    icon: "car",
    title: "Quer cobrir o carro",
    text: "Sol, chuva e maresia comendo a pintura todo dia na garagem descoberta.",
  },
  {
    icon: "flame",
    title: "Quer usar a área gourmet",
    text: "A churrasqueira está pronta, mas ninguém para ali quando o sol bate ou a chuva chega.",
  },
  {
    icon: "sparkle",
    title: "Quer um espaço que impressione",
    text: "Piscina, sacada ou jardim que pedem um projeto à altura do resto da casa.",
  },
];

export const entregas = [
  {
    icon: "layers",
    title: "Madeiras selecionadas e não qualquer madeira",
    text: "Peça escolhida uma a uma, peça fora do padrão sai fora, peças com tratamento comprovado, opções nobres e garantia por escrito.",
  },
  {
    icon: "ruler",
    title: "Cuidado com cada peça",
    text: "Cada peça tem seu encaixe, retoques e cortes já realizados ainda em fábrica para chegar pré pronta no local de instalação, garantindo qualidade e exatidão em cada peça.",
  },
  {
    icon: "brush",
    title: "Verniz é proteção e é antes de executar",
    text: "Cada peça de madeira recebe 3 demãos de verniz Osmocolor ainda em fábrica para aumentar a proteção e a durabilidade da sua peça. E a cor é totalmente da sua escolha.",
  },
  {
    icon: "users",
    title: "Quem fabrica é quem instala",
    text: "Sem equipe terceirizada, a equipe que trabalha na fábrica é a equipe que instala, com treinamento, experiência e cuidado nos detalhes.",
  },
];

export const etapas = [
  { n: "01", icon: "message", title: "Você manda foto e medidas", text: "Foto de celular e as medidas aproximadas já bastam para começar." },
  { n: "02", icon: "ruler", title: "Desenhamos o projeto com você", text: "Material, cobertura, caimento e acabamento definidos junto." },
  { n: "03", icon: "wallet", title: "Orçamento fechado no WhatsApp", text: "PDF com peças, medidas e condições. Sem surpresa depois." },
  { n: "04", icon: "pin", title: "Visita técnica no local", text: "Sem custo, feita depois do orçamento inicial, com medida final." },
  { n: "05", icon: "hammer", title: "Fabricação e instalação", text: "Peça pronta sai da fábrica e sobe rápido, com equipe própria." },
];

export const etapaBullets = [
  { icon: "gift", title: "Orçamento e visita sem custo", text: "Nenhuma das duas etapas é cobrada." },
  { icon: "wallet", title: "50% na entrada, 50% na entrega", text: "Pix, dinheiro ou até 21x no cartão." },
  { icon: "clock", title: "20 a 40 dias úteis", text: "Conforme a demanda. Prazo exato com a equipe." },
];

export type Cobertura = "simples" | "sanduiche" | "leitosa";

export const coberturaLabels: Record<Cobertura, string> = {
  simples: "Aluzinco Simples",
  sanduiche: "Aluzinco Sanduíche",
  leitosa: "Fibropolipropileno Leitosa",
};

export type Projeto = {
  img: string;
  titulo: string;
  legenda: string;
  cobertura: Cobertura;
};

/** obra por obra, na ordem das pastas de foto. As nove primeiras vão para a home. */
export const projetos: Projeto[] = [
  { img: "/img/proj-01.webp", titulo: "Tijucas", legenda: "Angelim Pedra · Aluzinco Simples", cobertura: "simples" },
  { img: "/img/proj-02.webp", titulo: "Florianópolis", legenda: "Angelim Pedra · Aluzinco Sanduíche", cobertura: "sanduiche" },
  { img: "/img/proj-03.webp", titulo: "Florianópolis", legenda: "Pinus Tratado · Fibropolipropileno Leitosa", cobertura: "leitosa" },
  { img: "/img/proj-04.webp", titulo: "Penha", legenda: "Angelim Pedra · Aluzinco Simples", cobertura: "simples" },
  { img: "/img/proj-05.webp", titulo: "Tijucas", legenda: "Pinus Tratado · Aluzinco Sanduíche", cobertura: "sanduiche" },
  { img: "/img/proj-06.webp", titulo: "Canelinha", legenda: "Pinus Tratado · Aluzinco Sanduíche", cobertura: "sanduiche" },
  { img: "/img/proj-07.webp", titulo: "Guaramirim", legenda: "Pinus Tratado · Fibropolipropileno Leitosa", cobertura: "leitosa" },
  { img: "/img/proj-08.webp", titulo: "São José", legenda: "Pinus Tratado · Aluzinco Simples", cobertura: "simples" },
  { img: "/img/proj-09.webp", titulo: "Canelinha", legenda: "Pinus Tratado · Aluzinco Simples", cobertura: "simples" },
  { img: "/img/proj-10.webp", titulo: "Canelinha", legenda: "Pinus Tratado · Fibropolipropileno Leitosa", cobertura: "leitosa" },
  { img: "/img/proj-11.webp", titulo: "São José", legenda: "Pinus Tratado · Aluzinco Simples", cobertura: "simples" },
  { img: "/img/proj-12.webp", titulo: "Brusque", legenda: "Angelim Pedra · Aluzinco Sanduíche", cobertura: "sanduiche" },
];

/** a home mostra as nove primeiras, de três em três */
export const projetosHome = projetos.slice(0, 9);

/** a página de trabalhos mostra tudo, mais os detalhes de cobertura */
export const galeriaProjetos: Projeto[] = [
  ...projetos,
  {
    img: "/img/cobertura-simples.webp",
    titulo: "Aluzinco Simples",
    legenda: "Detalhe da cobertura",
    cobertura: "simples",
  },
];

export type Madeira = {
  id: string;
  nome: string;
  nivel: number;
  nivelTag: string;
  img: string;
  cor: string;
  bullets: string[];
};

export const madeiras: Madeira[] = [
  {
    id: "pinus",
    nome: "Pinus Tratado",
    nivel: 1,
    nivelTag: "Custo benefício",
    img: "/img/madeira-pinus.webp",
    cor: "#C08A4E",
    bullets: [
      "15 anos de garantia de fábrica",
      "Tratamento completo contra cupim e fungo",
      "A mais pedida para garagem e uso externo",
      "Recebe verniz normalmente, no tom que você escolher",
    ],
  },
  {
    id: "angelim",
    nome: "Angelim Pedra",
    nivel: 2,
    nivelTag: "Madeira nobre",
    img: "/img/madeira-angelim.webp",
    cor: "#9C5333",
    bullets: [
      "Tom avermelhado natural que valoriza o ambiente",
      "Durabilidade muito acima das madeiras tradicionais",
      "Ideal para área de lazer e projeto de longo prazo",
      "Excelente resistência ao tempo e ao sol do litoral",
    ],
  },
  {
    id: "grapia",
    nome: "Grapia",
    nivel: 3,
    nivelTag: "Topo em madeira de lei",
    img: "/img/madeira-grapia.webp",
    cor: "#6E4426",
    bullets: [
      "Também conhecida como Garapeira",
      "Madeira de lei de verdade, resistência de geração",
      "Maior densidade e estabilidade da nossa linha",
      "Para quem não quer mexer nesse projeto nunca mais",
    ],
  },
  {
    id: "ecologica",
    nome: "Madeira Ecológica",
    nivel: 4,
    nivelTag: "Premium sem manutenção",
    img: "/img/madeira-ecologica.webp",
    cor: "#5B4630",
    bullets: [
      "10 anos de garantia, durabilidade estimada em 50",
      "Não precisa de verniz nem de lixamento periódico",
      "Não apodrece, não empena e não sofre cupim",
      "Sttilo é revendedora e instaladora autorizada In Brasil",
    ],
  },
];

export const vernizes = [
  { nome: "Black", hex: "#1C1A18" },
  { nome: "Canela", hex: "#C0703C" },
  { nome: "Nogueira", hex: "#6B5D4A" },
  { nome: "Natural UV Gold", hex: "#D9A245" },
  { nome: "Ipê", hex: "#5A3A22" },
  { nome: "Transparente", hex: "#E0B96A" },
  { nome: "Cedro", hex: "#A8412A" },
  { nome: "Incolor UV Glass", hex: "#E8D5A8" },
  { nome: "Mogno", hex: "#B25A26" },
  { nome: "Branco Neve", hex: "#EFEDE6" },
  { nome: "Imbuia", hex: "#B0552B" },
  { nome: "Castanho", hex: "#8A6520" },
  { nome: "Castanheira", hex: "#7A5A24" },
];

export const coberturas = [
  {
    nome: "Aluzinco Simples",
    img: "/img/cobertura-simples.webp",
    bullets: [
      "3 anos de garantia de fábrica",
      "Opção de maior custo benefício",
      "Pintura aplicada na face inferior",
      "Perfeita para garagem e uso diário",
      "Extremamente resistente e de alta durabilidade",
    ],
  },
  {
    nome: "Aluzinco Sanduíche",
    img: "/img/cobertura-sanduiche.webp",
    bullets: [
      "3 anos de garantia de fábrica",
      "Opção premium de extrema qualidade",
      "Pintura nas duas faces, livre escolha",
      "Com isolamento térmico entre as chapas",
      "Modelo forro que dispensa o forro interno, acabamento perfeito",
    ],
  },
  {
    nome: "Fibropolipropileno Leitosa",
    img: "/img/cobertura-leitosa.webp",
    bullets: [
      "3 anos de garantia de fábrica",
      "Maior custo benefício para passagem de luz",
      "Modelo leitoso não passa a luz toda, então o ambiente não esquenta",
      "Superior ao policarbonato alveolar, mais resistente",
      "Alta durabilidade com limpeza e manutenção fáceis",
    ],
  },
];

export const coresTelha = [
  { nome: "Bege", ral: "1015", hex: "#E3C9A5" },
  { nome: "Preto", ral: "9005", hex: "#141414" },
  { nome: "Cerâmica", ral: "8023", hex: "#C6552A" },
  { nome: "Vermelho", ral: "3000", hex: "#B62025" },
  { nome: "Amarelo", ral: "1023", hex: "#F0C808" },
  { nome: "Verde folha", ral: "6002", hex: "#1F6B2E" },
  { nome: "Verde escuro", ral: "6005", hex: "#14563C" },
  { nome: "Verde militar", ral: "6003", hex: "#5A5B3C" },
  { nome: "Branco", ral: "9003", hex: "#EDEDE8" },
  { nome: "Cinza claro", ral: "7040", hex: "#8E9BA0" },
  { nome: "Cinza grafite", ral: "7024", hex: "#4A4E52" },
  { nome: "Azul", ral: "5010", hex: "#12489B" },
  { nome: "Azul turquesa", ral: "5018", hex: "#1D9C93" },
  { nome: "Azul Del Rey", ral: "5002", hex: "#12277F" },
  { nome: "Marrom", ral: "8024", hex: "#8A4A2C" },
  { nome: "Amadeirado", ral: "—", hex: "#9C6A3D" },
];

export const depoimentos = [
  {
    nome: "Patrícia Costa",
    cidade: "Florianópolis",
    texto: "",
  },
  {
    nome: "Jacques",
    cidade: "Canelinha",
    texto:
      "Capricho do início ao fim, obra feita antes do previsto. Amei muito a qualidade do produto e o atendimento de primeira. Jhonatan, parabéns pelo trabalho prestado e pela qualidade entregue 🤝 que venham os próximos 🙏",
  },
  {
    nome: "Natan Lamarche",
    cidade: "Guaramirim",
    texto:
      "Estou passando aqui para parabenizar pelo serviço prestado, serviços de ótima qualidade e cuidadoso, só elogio a essa equipe!!!",
  },
  {
    nome: "Charlise Gasparotto",
    cidade: "Tijucas",
    texto:
      "Minha experiência foi muito boa. Fui bem atendida, entrega no prazo e trouxeram sempre um olhar de solução para a execução do projeto. Fiquei satisfeita!",
  },
  {
    nome: "Tiago Fuzão",
    cidade: "Brusque",
    texto: "Atendimento muito bom e tudo que prometeu se cumpriu.",
  },
  {
    nome: "Diane Honorato",
    cidade: "São João Batista",
    texto:
      "Atendimento top, instalaram o pergolado no prazo, equipe de instalação rápida. Material do pergolado lindo e forte!",
  },
  {
    nome: "Ricardo Gardini",
    cidade: "Camboriú",
    texto: "Top, serviço dentro do prazo. Entrega sem enrolação. Preço justo.",
  },
  {
    nome: "Luan Carlo Zugel",
    cidade: "Tijucas",
    texto:
      "Equipe muito competente e prestativa, materiais de boa qualidade, orçamento personalizado e execução dentro do prazo combinado. Recomendo!",
  },
  {
    nome: "Geraldo Safanelli",
    cidade: "Penha",
    texto: "Serviço ótimo.",
  },
];

export const cidades = [
  "Porto Belo",
  "Bombinhas",
  "Itapema",
  "Tijucas",
  "Penha",
  "Balneário Camboriú",
  "Camboriú",
  "Itajaí",
  "Brusque",
  "Canelinha",
  "São João Batista",
  "Nova Trento",
  "Gaspar",
  "Blumenau",
  "Florianópolis",
  "São José",
  "Palhoça",
  "Biguaçu",
  "Guaramirim",
];

export const faq = [
  { q: "Qual o prazo de entrega?", a: "De 20 a 40 dias úteis, dependendo da demanda do momento. Se você tem uma data em mente, fale com a equipe que a gente confirma se dá para atender." },
  { q: "Como funciona o pagamento?", a: "50% de entrada e 50% na entrega. Cada parte pode ser à vista em dinheiro ou Pix, ou parcelada em até 21x no cartão de crédito." },
  { q: "O verniz já está incluso?", a: "Sim. Três demãos de Osmocolor aplicadas na fábrica antes da montagem, no tom que você escolher, sem custo adicional." },
  { q: "Vocês cobram pelo orçamento ou pela visita?", a: "Nenhum dos dois. A visita técnica acontece depois que o orçamento inicial é enviado e também não tem custo." },
  { q: "A telha entra no orçamento?", a: "Entra. Telha, pintura da telha e instalação dela na estrutura já vão no valor fechado." },
  { q: "Vocês fazem sob medida?", a: "Todo projeto é sob medida. Não trabalhamos com tamanho de catálogo, porque nenhum espaço é igual ao outro." },
  { q: "Precisa de manutenção depois?", a: "Nas madeiras naturais, sim, com reaplicação de verniz de tempos em tempos. A gente te orienta na entrega. Na Madeira Ecológica não é necessário." },
  { q: "Vocês fazem calha e rufo?", a: "É a única etapa que não executamos. Temos parceiros que já conhecem nosso padrão e entram logo depois da nossa entrega." },
];

export const ctaBullets = [
  { icon: "gift", label: "Orçamento sem custo" },
  { icon: "clock", label: "Resposta no mesmo dia" },
  { icon: "shield", label: "Garantia de fábrica" },
];

// Aliases usados pelas sections (nomes em ingles herdados do layout)
export const steps = etapas.map((e, i) => ({
  n: e.n,
  title: e.title,
  short: ["Contato", "Projeto", "Orçamento", "Visita", "Instalação"][i],
  items: [e.text],
}));

export const telhaOptions = coberturas.map((c) => ({
  name: c.nome,
  kicker: c.bullets[1],
  desc: c.bullets.slice(2).join(". ") + ".",
  featured: c.nome.includes("Sanduíche"),
}));

export const telhaColors = coresTelha.map((c) => ({ name: c.nome, hex: c.hex }));
