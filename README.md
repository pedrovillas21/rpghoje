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
  - História do Orokai: preencha `historia` com uma lista de parágrafos (hoje está `null`).
- **Músicas:** `public/audio/` e o mapa `TRACKS` em `components/AudioProvider.tsx`.
  - Tema do Kitetsu: coloque o MP3 em `public/audio/kitetsu.mp3`, adicione `kitetsu` em `TrackId`/`TRACKS`
    e troque `track: "sign"` por `track: "kitetsu"` e `tema: null` pelo nome da música na ficha dele.
- **Retratos:** `public/personagens/`

## Deploy na Vercel

```bash
npx vercel
```

Ou suba o repositório no GitHub e importe em vercel.com/new. Não precisa de configuração extra.
Os MP3 em `public/` ficam acessíveis pela URL do site, então compartilhe o link só com a mesa
(ou ative a Deployment Protection da Vercel).
