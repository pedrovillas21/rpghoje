import type { TrackId } from "@/components/AudioProvider";

export type Atributo = { nome: string; valor: number };
export type Vital = { nome: string; valor: number };
export type Poder = { nome: string; nivel?: number; detalhe?: string };

export type Personagem = {
  slug: "orokai" | "ashihira" | "kitetsu";
  nome: string;
  sobrenome: string;
  cor: string;
  retrato: string;
  track: TrackId;
  /** Nome exibido do tema. Quando o tema próprio ainda não existe, fica null e toca Sign. */
  tema: string | null;
  rank: string;
  nivel: number;
  cla: string;
  idade: number;
  altura: string;
  vilaOrigem: string;
  atuacao: string;
  tendencia: string;
  lema: string;
  historia: string[] | null;
  vitais: Vital[];
  atributos: Atributo[];
  poderes: Poder[];
  pontosFortes: string[];
  extras?: { titulo: string; itens: string[] }[];
  invocacoes?: { nome: string; imagem: string }[];
};

export const personagens: Personagem[] = [
  {
    slug: "orokai",
    nome: "Orokai",
    sobrenome: "Oromachi",
    cor: "#8fce6e",
    retrato: "/personagens/orokai.png",
    track: "orokai",
    tema: "Orochimaru's Theme",
    rank: "Sannin/Kage",
    nivel: 20,
    cla: "Oromachi",
    idade: 21,
    altura: "1,85 m",
    vilaOrigem: "Névoa",
    atuacao: "Ordem do Véu Sorridente",
    tendencia: "Nukenin",
    lema: "Desta terra árida — eu farei crescer espinhos.",
    historia: null,
    vitais: [
      { nome: "Vitalidade", valor: 167 },
      { nome: "Chakra", valor: 90 },
      { nome: "Iniciativa", valor: 33 },
      { nome: "Esquiva", valor: 33 },
    ],
    atributos: [
      { nome: "Força", valor: 13 },
      { nome: "Destreza", valor: 25 },
      { nome: "Agilidade", valor: 19 },
      { nome: "Percepção", valor: 8 },
      { nome: "Inteligência", valor: 20 },
      { nome: "Vigor", valor: 19 },
      { nome: "Espírito", valor: 20 },
    ],
    poderes: [
      { nome: "Hebi Ninpou", nivel: 10, detalhe: "Canhão · Infligir Medo · Imergir · Ricochete" },
      { nome: "Kuchiyose", nivel: 10, detalhe: "Invocação de Mamba e Coral" },
      { nome: "Dokujutsu", nivel: 10, detalhe: "A arte dos venenos" },
      { nome: "Juuinka", nivel: 2, detalhe: "Selos amaldiçoados Ichi & Ni" },
    ],
    pontosFortes: [
      "Mestre dos venenos: Dokujutsu no nível 10 e Venefício 22",
      "Troca de pele: Kawarimi com ação parcial (Possessão da Serpente Branca Nv2)",
      "Yamata no Jutsu e Braços de Serpente com alcance de 6 m",
      "Ninja médico: Medicina e Ocultismo 20, cria antídotos e opera em campo",
      "Blefar 20 e Furtividade 17: ninguém sabe o que ele está tramando",
    ],
    invocacoes: [
      { nome: "Mamba", imagem: "/personagens/orokai-mamba.png" },
      { nome: "Coral", imagem: "/personagens/orokai-coral.png" },
    ],
  },
  {
    slug: "ashihira",
    nome: "Ashihira",
    sobrenome: "Senju",
    cor: "#b69cff",
    retrato: "/personagens/ashihira.jpg",
    track: "ashihira",
    tema: "Hollow",
    rank: "Sannin/Kage",
    nivel: 20,
    cla: "Senju",
    idade: 22,
    altura: "1,80 m",
    vilaOrigem: "Konohagakure",
    atuacao: "Ordem do Véu Sorridente",
    tendencia: "Caótico bom",
    lema: "Se não existe a paz, então eu vou criá-la, pois a esperança nunca morrerá enquanto existirem pessoas que acreditam nela.",
    historia: [
      "Prodígio do Clã Senju, Ashihira e seu irmão gêmeo, Akashi, foram os únicos do clã a sobreviver à guerra entre nações. Sem nunca ter pisado na academia ninja, aprendeu na marra a dominar Suiton, Katon, Fuuton, Raiton, Doton e Fuuinjutsu.",
      "Cresceu inspirado pelo Yondaime Hokage, Minato Namikaze, e pelo Hiraishin, mas a maior inspiração é o próprio irmão, que serve de parâmetro para ele sempre ir além.",
      "Brincalhão e extrovertido no dia a dia, vira sério e estratégico quando importa. Busca a paz do seu próprio jeito, mesmo que isso signifique matar qualquer um que ameace quem ele ama.",
    ],
    vitais: [
      { nome: "Vitalidade", valor: 134 },
      { nome: "Chakra", valor: 90 },
      { nome: "Iniciativa", valor: 36 },
      { nome: "Sensor", valor: 42 },
    ],
    atributos: [
      { nome: "Força", valor: 8 },
      { nome: "Destreza", valor: 20 },
      { nome: "Agilidade", valor: 20 },
      { nome: "Percepção", valor: 12 },
      { nome: "Inteligência", valor: 20 },
      { nome: "Vigor", valor: 8 },
      { nome: "Espírito", valor: 20 },
    ],
    poderes: [
      { nome: "Raiton Versátil", nivel: 10, detalhe: "Lâmina de Raios · Kirin" },
      { nome: "Katon Versátil", nivel: 10, detalhe: "Ricochete · Meteoro" },
      { nome: "Fuuton Versátil", nivel: 10, detalhe: "Rasengan · Onda Explosiva" },
      { nome: "Suiton Versátil", nivel: 10, detalhe: "Prisão de Água · Colisão de Ondas" },
      { nome: "Doton Versátil", nivel: 10, detalhe: "Tremor · Algemar" },
      { nome: "Fuuinjutsu", nivel: 10, detalhe: "Selos e marcas de Hiraishin" },
    ],
    pontosFortes: [
      "Os cinco elementos e o Fuuinjutsu, todos no nível 10",
      "Hiraishin: marcas espalhadas por aliados, Kages e locais estratégicos",
      "Clone Verdadeiro: luta lado a lado consigo mesmo",
      "Sensor 42 e Domínio do Raio, com crítico aprimorado em Raiton",
      "Controle Perfeito: ganha chakra extra igual à Inteligência",
    ],
    extras: [
      {
        titulo: "Objetivos",
        itens: ["Proteger Konoha", "Tornar-se ANBU", "Ajudar o Ryu com seus laços", "Resolver os problemas da Folha"],
      },
      { titulo: "Promessa", itens: ["Proteger meus irmãos, mesmo que custe a minha vida"] },
      { titulo: "Comida preferida", itens: ["Rāmen Ichiraku"] },
    ],
  },
  {
    slug: "kitetsu",
    nome: "Kitetsu",
    sobrenome: "Hyuuga",
    cor: "#6f9dff",
    retrato: "/personagens/kitetsu.png",
    track: "kitetsu",
    tema: "Torture",
    rank: "Chuunin",
    nivel: 16,
    cla: "Hyuuga",
    idade: 22,
    altura: "1,80 m",
    vilaOrigem: "Konohagakure",
    atuacao: "Konohagakure",
    tendencia: "Neutro bom",
    lema: "Meu punho esmagará todos que ficarem no meu caminho.",
    historia: null,
    vitais: [
      { nome: "Vitalidade", valor: 138 },
      { nome: "Chakra", valor: 58 },
      { nome: "Pontos Suika", valor: 48 },
      { nome: "Sensor", valor: 36 },
    ],
    atributos: [
      { nome: "Força", valor: 8 },
      { nome: "Destreza", valor: 16 },
      { nome: "Agilidade", valor: 16 },
      { nome: "Percepção", valor: 10 },
      { nome: "Inteligência", valor: 2 },
      { nome: "Vigor", valor: 16 },
      { nome: "Espírito", valor: 16 },
    ],
    poderes: [
      { nome: "Juuken", nivel: 8, detalhe: "O Punho Gentil do Clã Hyuuga" },
      { nome: "Byakugan", detalhe: "Visão 360°, raio-X e visão de chakra" },
      { nome: "Tenketsu Byakugan", detalhe: "Sela os pontos de chakra do alvo" },
    ],
    pontosFortes: [
      "Juuken nível 8: cada golpe atinge direto o sistema de chakra",
      "Byakugan: enxerga em 360°, através de paredes e o chakra de qualquer um",
      "Ataque Múltiplo e Ataque Progressivo: sequências que ficam mais fortes a cada acerto",
      "Crítico Aprimorado (14-15-16) e Especialista em combate desarmado",
      "Duro de Matar e Velocista: não cai fácil e chega antes de todo mundo",
    ],
  },
];

export function getPersonagem(slug: string) {
  return personagens.find((p) => p.slug === slug);
}
