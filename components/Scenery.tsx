"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 400 120" className={className} style={style} aria-hidden="true">
      <path
        d="M0 120C18 86 58 82 80 96c10-44 72-56 92-14 20-48 92-50 100-4 20-26 72-24 80 12 20-10 48 0 48 30Z"
        fill="currentColor"
      />
      <path
        d="M120 104c10-12 26-12 34 0M232 100c12-14 30-14 40 0"
        fill="none"
        stroke="var(--color-ink)"
        strokeOpacity=".25"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Céu fixo: lua que desce devagar conforme a página rola. */
export function Sky() {
  const { scrollYProgress } = useScroll();
  const moonY = useTransform(scrollYProgress, [0, 1], ["0vh", "55vh"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.3, 0.15]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_0%,#1d2233_0%,#0f0d0c_60%)]" />
      <motion.div style={{ y: moonY }} className="absolute top-[8vh] right-[8vw]">
        <motion.div
          style={{ opacity: glow }}
          className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(239,230,210,.35),transparent_65%)]"
        />
        <div className="relative size-28 rounded-full bg-[radial-gradient(circle_at_35%_35%,#fbf6ea,#d8ceb8_70%,#b9ad94)] shadow-[0_0_80px_rgba(239,230,210,.25)] sm:size-40" />
      </motion.div>
    </div>
  );
}

// Posições fixas para não haver diferença entre servidor e cliente.
const LEAVES = [
  { l: 6, d: 14, delay: 0, drift: 80, spin: 540, s: 16 },
  { l: 18, d: 18, delay: 4, drift: -60, spin: -420, s: 12 },
  { l: 29, d: 16, delay: 9, drift: 120, spin: 600, s: 14 },
  { l: 41, d: 20, delay: 2, drift: -90, spin: -500, s: 10 },
  { l: 53, d: 15, delay: 7, drift: 70, spin: 380, s: 18 },
  { l: 64, d: 19, delay: 11, drift: -40, spin: -620, s: 12 },
  { l: 75, d: 17, delay: 5, drift: 100, spin: 450, s: 15 },
  { l: 86, d: 21, delay: 1, drift: -110, spin: -360, s: 11 },
  { l: 94, d: 16, delay: 13, drift: 50, spin: 520, s: 13 },
  { l: 12, d: 22, delay: 15, drift: 90, spin: -480, s: 9 },
];

export function Leaves() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {LEAVES.map((f, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="leaf absolute top-0 text-[#6f8f4e]"
          style={
            {
              left: `${f.l}%`,
              width: f.s,
              height: f.s,
              opacity: 0,
              "--dur": `${f.d}s`,
              "--delay": `${f.delay}s`,
              "--drift": `${f.drift}px`,
              "--spin": `${f.spin}deg`,
            } as React.CSSProperties
          }
        >
          <path d="M12 2C6 6 4 12 12 22c8-10 6-16 0-20Z" fill="currentColor" />
          <path d="M12 5v15" stroke="#0f0d0c" strokeOpacity=".4" strokeWidth="1" />
        </svg>
      ))}
    </div>
  );
}
