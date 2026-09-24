export const depoimento = {
  nome: "Kenji Sarutobi",
  /**
   * Caminho do vídeo em `public/`, ex.: "/video/kenji.mp4".
   * Enquanto for null, a seção mostra o aviso de "depoimento em breve".
   */
  video: null as string | null,
  /** Imagem opcional mostrada antes do play, ex.: "/video/kenji-capa.jpg". */
  capa: null as string | null,
};
