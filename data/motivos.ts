export type IconName =
  | "calendario"
  | "ampulheta"
  | "chama"
  | "pico"
  | "gancho"
  | "novato"
  | "pergaminho"
  | "dado"
  | "churrasco"
  | "pudim"
  | "coracao"
  | "folha";

export type Motivo = { titulo: string; texto: string; icone: IconName };
export type Ato = { numero: string; nome: string; motivos: Motivo[] };

export const atos: Ato[] = [
  {
    numero: "I",
    nome: "O Tempo",
    motivos: [
      { titulo: "Três semanas", texto: "Faz três semanas que estamos sem mesa. Os dados já estão criando poeira.", icone: "ampulheta" },
      { titulo: "Novembro", texto: "Se não for esse sábado, a próxima mesa possível é só em novembro.", icone: "calendario" },
      { titulo: "O hype", texto: "Esperar até lá é deixar esfriar o hype que a gente tem agora.", icone: "chama" },
    ],
  },
  {
    numero: "II",
    nome: "A História",
    motivos: [
      { titulo: "O ápice", texto: "Estamos no ápice da mesa.", icone: "pico" },
      { titulo: "Os ganchos", texto: "Chegamos no momento em que tudo vai se desenrolar e, querendo ou não, ficaram ganchos para trás.", icone: "gancho" },
      { titulo: "O Monteiro", texto: "O Kitetsu do Monteiro ainda precisa ser desenvolvido para se encaixar na história.", icone: "novato" },
    ],
  },
  {
    numero: "III",
    nome: "A Logística",
    motivos: [
      { titulo: "Fichas prontas", texto: "Nossas fichas estão prontas para serem usadas.", icone: "pergaminho" },
      { titulo: "Dados e som", texto: "O João trouxe os dados e a caixa de som.", icone: "dado" },
      { titulo: "Churrasco", texto: "Não tem nada melhor do que um churras para acompanhar a sessão.", icone: "churrasco" },
      { titulo: "Tem pudim", texto: "Tem pudim.", icone: "pudim" },
    ],
  },
  {
    numero: "IV",
    nome: "O Coração",
    motivos: [
      { titulo: "Dia atípico", texto: "Pedro Henrique e Vitin têm mulheres para dar a devida atenção, e hoje é um dia atípico.", icone: "coracao" },
      { titulo: "Narutin", texto: "Nós amamos narutin.", icone: "folha" },
    ],
  },
];
