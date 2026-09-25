"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

const CLICAVEL = "a, button, [role='button'], label, summary, video";

/**
 * Cursor em forma de pergaminho ninja. Um ponto marca a posição exata do clique e o
 * pergaminho segue com mola logo ao lado; sobre algo clicável ele se abre.
 * Só é ativado em dispositivos com mouse (pointer: fine).
 */
export function ScrollCursor() {
  const [ativo, setAtivo] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [pressionado, setPressionado] = useState(false);
  const reduce = useReducedMotion();

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const atualizar = () => setAtivo(mq.matches);
    atualizar();
    mq.addEventListener("change", atualizar);
    return () => mq.removeEventListener("change", atualizar);
  }, []);

  useEffect(() => {
    if (!ativo) return;
    const html = document.documentElement;
    html.classList.add("cursor-pergaminho");

    const mover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisivel(true);
      const alvo = e.target instanceof Element ? e.target.closest(CLICAVEL) : null;
      setAberto(!!alvo && !(alvo as HTMLButtonElement).disabled);
    };
    const sair = () => setVisivel(false);
    const baixo = () => setPressionado(true);
    const cima = () => setPressionado(false);

    window.addEventListener("pointermove", mover, { passive: true });
    window.addEventListener("pointerdown", baixo);
    window.addEventListener("pointerup", cima);
    document.addEventListener("mouseleave", sair);
    return () => {
      html.classList.remove("cursor-pergaminho");
      window.removeEventListener("pointermove", mover);
      window.removeEventListener("pointerdown", baixo);
      window.removeEventListener("pointerup", cima);
      document.removeEventListener("mouseleave", sair);
    };
  }, [ativo, x, y]);

  if (!ativo) return null;

  const mola = { type: "spring", stiffness: 420, damping: 26 } as const;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden="true" style={{ opacity: visivel ? 1 : 0 }}>
      {/* Ponto exato do clique */}
      <motion.div style={{ x, y }} className="absolute top-0 left-0">
        <motion.span
          className="absolute block rounded-full border-2 border-washi bg-shu"
          animate={{ width: aberto ? 14 : 8, height: aberto ? 14 : 8, x: aberto ? -7 : -4, y: aberto ? -7 : -4 }}
          transition={mola}
        />
      </motion.div>

      {/* Pergaminho que acompanha */}
      <motion.div style={reduce ? { x, y } : { x: sx, y: sy }} className="absolute top-0 left-0">
        <motion.svg
          viewBox="0 0 64 40"
          width="68"
          height="42"
          className="absolute top-2 left-2 overflow-visible drop-shadow-[0_4px_10px_rgba(0,0,0,.6)]"
          animate={{ rotate: aberto ? -12 : -32, scale: pressionado ? 0.82 : 1 }}
          transition={mola}
        >
          {/* Papel */}
          <motion.rect
            y="7"
            height="26"
            rx="1"
            fill="#efe6d2"
            animate={{ x: aberto ? 12 : 30, width: aberto ? 40 : 4 }}
            transition={mola}
          />
          <motion.g animate={{ opacity: aberto ? 1 : 0 }} transition={{ duration: 0.2, delay: aberto ? 0.08 : 0 }}>
            <path d="M17 14h22M17 19h26M17 24h18" stroke="#0f0d0c" strokeOpacity=".35" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="45" cy="26" r="3.2" fill="#c8432a" />
          </motion.g>

          {/* Rolo esquerdo */}
          <motion.g animate={{ x: aberto ? -18 : 0 }} transition={mola}>
            <rect x="23" y="3" width="8" height="4" rx="1.5" fill="#5a3a26" />
            <rect x="24" y="6" width="6" height="28" rx="3" fill="#9a6843" />
            <rect x="24" y="6" width="2" height="28" rx="1" fill="#b98a5f" />
            <rect x="23" y="33" width="8" height="4" rx="1.5" fill="#5a3a26" />
          </motion.g>
          {/* Rolo direito */}
          <motion.g animate={{ x: aberto ? 18 : 0 }} transition={mola}>
            <rect x="33" y="3" width="8" height="4" rx="1.5" fill="#5a3a26" />
            <rect x="34" y="6" width="6" height="28" rx="3" fill="#9a6843" />
            <rect x="34" y="6" width="2" height="28" rx="1" fill="#b98a5f" />
            <rect x="33" y="33" width="8" height="4" rx="1.5" fill="#5a3a26" />
          </motion.g>

          {/* Cordão vermelho que prende o pergaminho fechado */}
          <motion.g animate={{ opacity: aberto ? 0 : 1, scaleX: aberto ? 0.3 : 1 }} style={{ originX: "32px" }} transition={{ duration: 0.15 }}>
            <rect x="22" y="18" width="20" height="4" rx="1" fill="#c8432a" />
            <path d="M32 22l-3 7M32 22l3 7" stroke="#c8432a" strokeWidth="1.8" strokeLinecap="round" />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  );
}
