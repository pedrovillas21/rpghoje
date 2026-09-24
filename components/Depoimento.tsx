"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { depoimento } from "@/data/depoimento";
import { useAudio } from "./AudioProvider";

export function Depoimento() {
  return (
    <section className="relative mx-auto flex min-h-svh max-w-5xl flex-col items-center justify-center px-4 py-24 text-center sm:px-8 sm:py-32">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        className="mb-3 text-sm tracking-[0.3em] text-shu-light uppercase"
      >
        Testemunha
      </motion.p>
      <motion.h2
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.8 }}
        className="overflow-hidden pb-[0.08em] font-display text-[clamp(2.5rem,8vw,6rem)] leading-none font-extrabold"
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
          transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
        >
          {depoimento.nome}
        </motion.span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 0.4 }}
        className="mt-4 max-w-md text-lg text-washi-dim"
      >
        Um aliado tem algo a dizer ao mestre antes do veredito.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.94, rotate: -1.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 60, damping: 16 }}
        className="mt-12 w-full"
      >
        {depoimento.video ? <Player src={depoimento.video} capa={depoimento.capa} /> : <EmBreve />}
      </motion.div>
    </section>
  );
}

function Player({ src, capa }: { src: string; capa: string | null }) {
  const { setSuspended } = useAudio();
  const ref = useRef<HTMLVideoElement>(null);
  const [iniciado, setIniciado] = useState(false);
  const [paisagem, setPaisagem] = useState(false);

  // Se a seção sair da tela (troca de página) com o vídeo tocando, a trilha volta.
  useEffect(() => () => setSuspended(false), [setSuspended]);

  const tocar = () => {
    setIniciado(true);
    ref.current?.play().catch(() => {});
  };

  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-2xl border border-washi/15 bg-black shadow-[0_40px_100px_-30px_rgba(200,67,42,.45)] ${
        paisagem ? "aspect-video max-w-4xl" : "aspect-[9/16] max-w-[min(24rem,calc((100svh-8rem)*0.5625))]"
      }`}
    >
      <video
        ref={ref}
        src={src}
        poster={capa ?? undefined}
        playsInline
        preload="metadata"
        controls={iniciado}
        onLoadedMetadata={(e) => setPaisagem(e.currentTarget.videoWidth > e.currentTarget.videoHeight)}
        onPlay={() => {
          setIniciado(true);
          setSuspended(true);
        }}
        onPause={() => setSuspended(false)}
        onEnded={() => setSuspended(false)}
        className="absolute inset-0 size-full object-contain"
      />
      {!iniciado && (
        <button
          type="button"
          onClick={tocar}
          aria-label={`Assistir ao depoimento de ${depoimento.nome}`}
          className="group absolute inset-0 flex items-center justify-center bg-ink/40 transition-colors hover:bg-ink/20"
        >
          <span className="relative flex size-20 items-center justify-center rounded-full bg-shu text-washi shadow-[0_10px_40px_-5px_rgba(200,67,42,.8)] transition-transform group-hover:scale-110 sm:size-24">
            <span className="absolute inset-0 animate-ping rounded-full bg-shu opacity-25" aria-hidden="true" />
            <svg viewBox="0 0 24 24" className="relative ml-1 size-8 sm:size-10" fill="currentColor" aria-hidden="true">
              <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

/** Enquanto o vídeo não chega: uma "transmissão" aguardando sinal. */
function EmBreve() {
  return (
    <div className="relative mx-auto aspect-[9/16] max-w-sm overflow-hidden rounded-2xl border border-dashed border-washi/25 bg-ink-2 sm:aspect-[4/5]">
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #efe6d2 0 1px, transparent 1px 4px)" }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-washi/10 to-transparent"
        animate={{ top: ["-20%", "110%"] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      />

      <div className="absolute top-5 left-5 flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-shu-light">
        <motion.span
          className="size-2.5 rounded-full bg-shu"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
          aria-hidden="true"
        />
        REC
      </div>
      <div className="absolute top-5 right-5 font-mono text-xs text-washi-dim tabular-nums" aria-hidden="true">
        00:00
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-8">
        <svg viewBox="0 0 24 24" className="size-12 text-washi-dim" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="2.5" y="6" width="13" height="12" rx="2" />
          <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
        </svg>
        <p className="font-display text-2xl font-extrabold sm:text-3xl">Depoimento em gravação</p>
        <p className="max-w-60 text-washi-dim">O vídeo do {depoimento.nome.split(" ")[0]} chega em breve.</p>
      </div>
    </div>
  );
}
