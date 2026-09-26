"use client";

import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { useRef, useState } from "react";
import { flyTo } from "@/lib/flyTo";

/** Distância mínima entre o "Recusar" e o "Aceitar" (e entre o "Recusar" e o cursor). */
const MARGEM = 16;
/** Folga mínima entre o "Recusar" e a borda da tela. */
const BORDA = 8;
/** A mola do pulo (stiffness 300, damping 18) passa uns 15% do destino antes de voltar. */
const PASSA_DO_PONTO = 1.2;

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
  const aceitarRef = useRef<HTMLButtonElement>(null);
  const recusarRef = useRef<HTMLButtonElement>(null);
  const shake = useAnimationControls();

  const aceitar = () => {
    if (aceito) return;
    setAceito(true);
    setRecusa(null);
    setTimeout(() => shake.start({ x: [0, -14, 12, -8, 6, 0], transition: { duration: 0.45 } }), 250);
    setTimeout(() => flyTo("personagens", 2), 1900);
  };

  // O botão de recusar foge do cursor, sem nunca passar por cima do "Aceitar" nem sair da tela.
  const fugir = (cursor?: { x: number; y: number }) => {
    tentativas.current += 1;
    const botao = recusarRef.current;
    const pai = botao?.offsetParent?.getBoundingClientRect();
    const seguro = aceitarRef.current?.getBoundingClientRect();
    if (!botao || !pai || !seguro) return;
    const caixa = botao.getBoundingClientRect();

    // Posição natural (offset ignora o transform, mesmo no meio de um pulo) e a área proibida ao redor do "Aceitar".
    const base = { x: pai.left + botao.offsetLeft, y: pai.top + botao.offsetTop };
    const { width: w, height: h } = caixa;
    const proibida = { l: seguro.left - MARGEM, t: seguro.top - MARGEM, r: seguro.right + MARGEM, b: seguro.bottom + MARGEM };
    const alvo = cursor ?? { x: caixa.left + w / 2, y: caixa.top + h / 2 };
    // A seção corta o que vaza dela (overflow-clip): o botão precisa ficar na parte dela que está na tela.
    const secao = botao.closest("section")?.getBoundingClientRect();
    const limite = {
      l: Math.max(0, secao?.left ?? 0) + BORDA,
      t: Math.max(0, secao?.top ?? 0) + BORDA,
      r: Math.min(window.innerWidth, secao?.right ?? Infinity) - BORDA,
      b: Math.min(window.innerHeight, secao?.bottom ?? Infinity) - BORDA,
    };

    const valido = (dx: number, dy: number) => {
      const x = base.x + dx;
      const y = base.y + dy;
      if (alvo.x >= x - MARGEM && alvo.x <= x + w + MARGEM && alvo.y >= y - MARGEM && alvo.y <= y + h + MARGEM) return false;
      // Confere o caminho inteiro da mola, inclusive o quanto ela passa do destino antes de assentar.
      for (let k = 0; k <= PASSA_DO_PONTO; k += 0.05) {
        const px = caixa.left + (x - caixa.left) * k;
        const py = caixa.top + (y - caixa.top) * k;
        if (px < proibida.r && px + w > proibida.l && py < proibida.b && py + h > proibida.t) return false;
        if (k >= 1 && (px < limite.l || py < limite.t || px + w > limite.r || py + h > limite.b)) return false;
      }
      return true;
    };

    for (let i = 0; i < 40; i++) {
      const ang = Math.random() * Math.PI * 2;
      const r = 110 + Math.random() * 60;
      const dx = caixa.left - base.x + Math.cos(ang) * r;
      const dy = caixa.top - base.y + Math.sin(ang) * r * 0.6;
      if (valido(dx, dy)) return setFuga({ x: dx, y: dy });
    }
    // Sem saída boa: volta para o lugar de origem, que nunca encosta no "Aceitar".
    setFuga({ x: 0, y: 0 });
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
        {/* Depois de aceita, some junto com o carimbo mas continua ocupando o espaço para nada pular. */}
        <motion.button
          ref={aceitarRef}
          type="button"
          onClick={aceitar}
          disabled={aceito}
          aria-hidden={aceito}
          animate={{ opacity: aceito ? 0 : 1 }}
          transition={{ duration: 0.35, delay: aceito ? 0.15 : 0 }}
          className="relative z-10 min-h-14 rounded-full bg-washi px-10 font-display text-xl font-extrabold text-ink transition-transform hover:scale-105 active:scale-95 disabled:pointer-events-none"
        >
          Aceitar a missão
        </motion.button>
        {!aceito && (
          <motion.button
            type="button"
            ref={recusarRef}
            onPointerEnter={(e) => fugir({ x: e.clientX, y: e.clientY })}
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
            className="pointer-events-none absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
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
