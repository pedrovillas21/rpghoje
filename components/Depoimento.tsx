"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
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

const semInscricao = () => () => {};

function Player({ src, capa }: { src: string; capa: string | null }) {
  const { setSuspended } = useAudio();
  const [aberto, setAberto] = useState(false);
  // O portal só existe no cliente; no servidor não há document.body.
  const montado = useSyncExternalStore(semInscricao, () => true, () => false);
  // Proporção largura/altura do vídeo; começa em pé (9:16) até o metadata chegar.
  const [proporcao, setProporcao] = useState(9 / 16);
  const tempo = useRef(0);
  const medir = (v: HTMLVideoElement) => v.videoHeight && setProporcao(v.videoWidth / v.videoHeight);

  // Se a seção sair da tela (troca de página) com o vídeo tocando, a trilha volta.
  useEffect(() => () => setSuspended(false), [setSuspended]);

  const fechar = useCallback(() => {
    setAberto(false);
    setSuspended(false);
  }, [setSuspended]);

  useEffect(() => {
    if (!aberto) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", esc);
    };
  }, [aberto, fechar]);

  const paisagem = proporcao > 1;

  return (
    <>
      <div
        className={`relative mx-auto ${paisagem ? "max-w-4xl" : "max-w-[min(24rem,calc((100svh-8rem)*0.5625))]"}`}
        style={{ aspectRatio: proporcao }}
      >
        {!aberto && (
          <motion.button
            layoutId="depoimento-video"
            type="button"
            onClick={() => setAberto(true)}
            aria-label={`Assistir ao depoimento de ${depoimento.nome}`}
            style={{ borderRadius: 16 }}
            className="group absolute inset-0 overflow-hidden border border-washi/15 bg-black shadow-[0_40px_100px_-30px_rgba(200,67,42,.45)]"
          >
            {/* Só a capa: o #t pula para um quadro com imagem em vez do preto inicial. */}
            <video
              src={`${src}#t=0.1`}
              poster={capa ?? undefined}
              muted
              playsInline
              preload="metadata"
              tabIndex={-1}
              // O metadata pode chegar antes da hidratação, e aí o evento já passou: o ref cobre esse caso.
              ref={(v) => {
                if (v && v.readyState >= 1) medir(v);
              }}
              onLoadedMetadata={(e) => medir(e.currentTarget)}
              className="pointer-events-none absolute inset-0 size-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-ink/40 transition-colors group-hover:bg-ink/20">
              <span className="relative flex size-20 items-center justify-center rounded-full bg-shu text-washi shadow-[0_10px_40px_-5px_rgba(200,67,42,.8)] transition-transform group-hover:scale-110 sm:size-24">
                <span className="absolute inset-0 animate-ping rounded-full bg-shu opacity-25" aria-hidden="true" />
                <svg viewBox="0 0 24 24" className="relative ml-1 size-8 sm:size-10" fill="currentColor" aria-hidden="true">
                  <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z" />
                </svg>
              </span>
            </span>
          </motion.button>
        )}
      </div>

      {montado &&
        createPortal(
          <AnimatePresence>
            {aberto && (
              <div
                key="teatro"
                role="dialog"
                aria-modal="true"
                aria-label={`Depoimento de ${depoimento.nome}`}
                className="fixed inset-0 z-[60] flex items-center justify-center p-[3vmin]"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  onClick={fechar}
                  className="absolute inset-0 bg-ink/90 backdrop-blur-md"
                  aria-hidden="true"
                />
                <motion.div
                  layoutId="depoimento-video"
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  style={{
                    borderRadius: 16,
                    aspectRatio: proporcao,
                    height: `min(94svh, calc(94vw / ${proporcao}))`,
                  }}
                  className="relative overflow-hidden border border-washi/15 bg-black shadow-[0_0_140px_-20px_rgba(200,67,42,.6)]"
                >
                  <video
                    src={src}
                    poster={capa ?? undefined}
                    autoPlay
                    controls
                    playsInline
                    onLoadedMetadata={(e) => {
                      if (tempo.current) e.currentTarget.currentTime = tempo.current;
                    }}
                    onTimeUpdate={(e) => (tempo.current = e.currentTarget.currentTime)}
                    onPlay={() => setSuspended(true)}
                    onPause={() => setSuspended(false)}
                    onEnded={() => {
                      tempo.current = 0;
                      setSuspended(false);
                    }}
                    className="absolute inset-0 size-full object-contain"
                  />
                </motion.div>
                <motion.button
                  type="button"
                  onClick={fechar}
                  aria-label="Fechar vídeo"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1, transition: { delay: 0.35 } }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  className="absolute top-4 right-4 flex size-12 items-center justify-center rounded-full border border-washi/20 bg-ink/70 text-washi backdrop-blur-md transition-colors hover:border-shu hover:bg-shu sm:top-6 sm:right-6"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </motion.button>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
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
