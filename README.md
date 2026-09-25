# Por que devemos ter RPG hoje

Site de apresentação (só front-end) para convencer o mestre a ter mesa no sábado.
Next.js + Tailwind + Motion.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Onde mexer

- **Motivos do monólogo:** `data/motivos.ts`
- **Fichas dos personagens:** `data/personagens.ts`
- **Músicas:** `public/audio/` e o mapa `TRACKS` em `components/AudioProvider.tsx`.
- **Depoimento do Kenji:** coloque o vídeo em `public/video/kenji.mp4` e troque `video: null` por
  `video: "/video/kenji.mp4"` em `data/depoimento.ts`. Vídeo em pé ou deitado funciona; a trilha pausa
  enquanto ele toca. Prefira MP4 (H.264) comprimido, com menos de ~50 MB.
- **Retratos:** `public/personagens/`

## Deploy na Vercel

```bash
npx vercel
```

Ou suba o repositório no GitHub e importe em vercel.com/new. Não precisa de configuração extra.
Os MP3 em `public/` ficam acessíveis pela URL do site, então compartilhe o link só com a mesa
(ou ative a Deployment Protection da Vercel).
