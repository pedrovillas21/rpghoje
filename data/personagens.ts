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
    vilaOrigem: "Som",
    atuacao: "Ordem do Véu Sorridente",
    tendencia: "Nukenin",
    lema: "Desta terra árida — eu farei crescer espinhos.",
    historia: [
      "Orokai Oromachi, originário da Vila do Som, foi acolhido em seu passado pela Vila das Fontes Termais, onde cresceu e encontrou sua atual parceira, Mikawa.",
      "Orokai sempre carregou o fardo de ser filho de Orochimaru, o lendário Sannin da Folha. Sempre foi o filho mais jogado de lado pela sua falta de aptidão com habilidades e por não ter nenhuma habilidade fenomenal — para seu pai, ninjas comuns não são úteis, e Orokai era um desses.",
      "Hoje Orokai se encontra renegado e com uma força que seu pai jamais imaginou. Mostrou-se mais capaz que os outros quando se fala em esforço e determinação para conseguir o que mais queria — uma família que lutasse pela verdadeira paz. Ainda com sua parceira e mais 10 integrantes, eles buscam consertar o mundo, que há muito vem sendo deixado de lado pelos poderosos.",
      "Longe das ambições egoístas de Orochimaru e das manipulações dos grandes líderes, Orokai encontrou o seu próprio caminho. Ao lado de Mikawa e dos seus companheiros, ele não luta por vingança, mas pela redenção de uma terra esquecida. O filho rejeitado renasceu — e o seu legado será escrito com a paz que o seu pai nunca conseguiu conceber.",
    ],
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
    historia: [
      "Kitetsu carrega o Selo do Pássaro na Gaiola não como uma maldição, mas como o preço exato para manter seu mundo intacto. Dentro dos muros do complexo Hyuuga em Konoha, a vida da Família Secundária é ditada por servidão e regras rígidas, uma realidade que Mitsuro, seu pai, conhece perfeitamente. Um ex-lutador letal de linha de frente, Mitsuro tomou uma decisão drástica no passado: abandonou as missões de combate e aceitou uma posição no setor administrativo do clã. Ele não fez isso por ambição ou cansaço, mas por uma devoção absoluta à sua esposa, Yamada. Dona de uma saúde extremamente frágil e um coração pacifista, ela precisava de proteção constante. Trabalhando nas instalações internas, Mitsuro garantiu que estaria fisicamente ao lado dela todos os dias, usando a burocracia e a política do clã como um escudo invisível para manter a crueldade do mundo shinobi fora do jardim onde ela descansa.",
      "Se Mitsuro se tornou o escudo silencioso, Kitetsu moldou a si mesmo para ser a lâmina sangrenta. Para garantir que a paz de Yamada jamais fosse tocada e que seu pai não precisasse voltar a sujar as mãos, Kitetsu absorveu toda a violência da família. Foi essa necessidade implacável de proteger o lar e seus companheiros de time que distorceu o Punho Suave do garoto. Enquanto os nobres da Família Principal praticam o Juuken como uma dança perfeita e cerimonial, Kitetsu o forjou na brutalidade das missões de alto risco. Quebrando as leis não escritas da família, ele adaptou os 128 Golpes para a realidade das ruas: agarrar o alvo, quebrar a guarda na força bruta e destruir a rede de chakra em segundos. O objetivo nunca foi exibir técnica, mas aniquilar a ameaça instantaneamente para ter a certeza absoluta de que voltaria vivo para casa.",
      "Hoje, pai e filho operam em uma simbiose sombria que mantém a família de pé. Quando Konoha precisa despachar seu \"cão de guarda\" para neutralizar ameaças além das fronteiras, Kitetsu assume a escuridão. Enquanto o filho escreve cartas de acampamentos distantes para garantir à família e aos velhos amigos que está vivo e vigiando, Mitsuro usa sua influência nas mesas administrativas para manobrar os anciões. O pai arquiva relatórios problemáticos, encobre o excesso de violência do filho e rebate politicamente qualquer membro da Família Principal que tente punir Kitetsu por usar técnicas proibidas à Casa Secundária. Eles formam uma máquina perfeita de sangue, política e lealdade profunda, girando todos os dias com um único propósito: garantir que Yamada possa continuar tomando seu chá à tarde, completamente intocada pelas guerras que seus dois protetores travam em silêncio.",
    ],
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
