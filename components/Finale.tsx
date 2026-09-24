"use client";

import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useRef, useState } from "react";
import { flyTo } from "@/lib/flyTo";

const RECUSAS = [
  "Essa opção não está disponível neste servidor.",
  "O mestre tentou recusar. O dado rolou 1.",
  "Falha crítica na tentativa de recusar.",
];

export function Finale() {
  const [aceito, setAceito] = useState(false);
  const [recusa, setRecusa] = useState<string | null>(null);
  const [fuga, setFuga] = useState({ x: 0, y: 0 });
  const tentativas = useRef(0);
  const shake = useAnimationControls();

  const aceitar = () => {
    if (aceito) return;
    setAceito(true);
    setRecusa(null);
    setTimeout(() => shake.start({ x: [0, -14, 12, -8, 6, 0], transition: { duration: 0.45 } }), 250);
    setTimeout(() => flyTo("personagens", 2), 1900);
  };

  // O botão de recusar foge do cursor.
  const fugir = () => {
    tentativas.current += 1;
    const ang = Math.random() * Math.PI * 2;
    const r = 110 + Math.random() * 60;
    setFuga({ x: Math.cos(ang) * r, y: Math.sin(ang) * r * 0.6 });
  };

  const recusar = () => {
    setRecusa(RECUSAS[tentativas.current % RECUSAS.length]);
    tentativas.current += 1;
    fugir();
  };

  return (
    <motion.section
      animate={shake}
      className="relative flex min-h-svh flex-col items-center justify-center overflow-clip px-4 py-32 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1 }}
        className="font-display text-[clamp(2rem,6vw,4rem)] font-bold text-washi-dim"
      >
        Então, mestre…
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, scale: 0.6, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, delay: 0.5, ease: [0.2, 0.9, 0.2, 1] }}
        className="font-display text-[clamp(5rem,20vw,16rem)] leading-none font-extrabold text-shu"
      >
        sábado?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: 1.2 }}
        className="relative mt-16 flex flex-wrap items-center justify-center gap-6"
      >
        <button
          type="button"
          onClick={aceitar}
          className="min-h-14 rounded-full bg-washi px-10 font-display text-xl font-extrabold text-ink transition-transform hover:scale-105 active:scale-95"
        >
          Aceitar a missão
        </button>
        {!aceito && (
          <motion.button
            type="button"
            onPointerEnter={fugir}
            onClick={recusar}
            animate={fuga}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="min-h-11 rounded-full border border-washi/25 px-6 text-sm text-washi-dim"
          >
            Recusar
          </motion.button>
        )}
      </motion.div>

      <p className="mt-6 h-6 text-sm text-shu-light" aria-live="polite">
        {recusa}
      </p>

      <AnimatePresence>
        {aceito && (
          <motion.div
            role="status"
            initial={{ opacity: 0, scale: 3, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: -10 }}
            transition={{ type: "spring", stiffness: 260, damping: 14 }}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="flex flex-col items-center justify-center rounded-lg border-[6px] border-shu bg-ink/60 px-6 py-5 sm:px-10 sm:py-6 font-display text-shu backdrop-blur-sm">
              <span className="text-[clamp(1.75rem,8vw,5rem)] leading-none font-extrabold whitespace-nowrap">MISSÃO ACEITA</span>
              <span className="mt-2 text-xl font-bold tracking-[0.4em]">RANK S</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
