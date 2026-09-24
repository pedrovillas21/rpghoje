"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { flyTo } from "@/lib/flyTo";
import { useEffect, useRef } from "react";
import { useAudio, useTrack } from "./AudioProvider";
import { CharacterSelect } from "./CharacterSelect";
import { Finale } from "./Finale";
import { Monologue } from "./Monologue";
import { Cloud, Leaves, Sky } from "./Scenery";

const TITLE = [
  { t: "Por que", cls: "text-washi" },
  { t: "devemos ter", cls: "text-washi" },
  { t: "RPG hoje", cls: "text-shu" },
];

export function Experience() {
  const { started, start } = useAudio();
  useTrack("sign");

  // Antes do "Iniciar" a página fica travada na abertura.
  useEffect(() => {
    if (started) return;
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [started]);

  const begin = () => {
    start();
    document.documentElement.style.overflow = "";
    requestAnimationFrame(() => flyTo("monologo", 3.4));
  };

  return (
    <main className="relative">
      <Sky />
      {started && <Leaves />}
      <Intro started={started} onBegin={begin} />
      <Descent />
      <Monologue />
      <Finale />
      <CharacterSelect />
      <footer className="relative px-4 pt-10 pb-16 text-center text-sm text-washi-dim">
        Feito com muito chakra para o mestre.
      </footer>
    </main>
  );
}

function Intro({ started, onBegin }: { started: boolean; onBegin: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.7], ["blur(0px)", "blur(8px)"]);

  return (
    <section ref={ref} className="relative flex h-svh flex-col items-center justify-center overflow-hidden px-4">
      <motion.div style={reduce ? undefined : { y, scale, opacity, filter: blur }} className="text-center">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="mb-6 text-xs tracking-[0.3em] text-washi-dim uppercase sm:text-sm"
        >
          Um apelo formal ao mestre
        </motion.p>
        <h1 className="font-display text-[clamp(3rem,11vw,9.5rem)] leading-[0.92] font-extrabold">
          {TITLE.map((line, i) => (
            <span key={line.t} className="block overflow-hidden pb-[0.08em]">
              <motion.span
                className={`block ${line.cls}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.25 + i * 0.18, duration: 1.1, ease: [0.2, 0.9, 0.2, 1] }}
              >
                {line.t}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={started ? { opacity: 0, y: 40, pointerEvents: "none" } : { opacity: 1, y: 0 }}
        transition={{ delay: started ? 0 : 1.1, duration: 0.8 }}
        className="mt-14 flex flex-col items-center gap-4"
      >
        <button
          type="button"
          onClick={onBegin}
          className="group relative flex h-16 min-w-52 items-center justify-center rounded-full bg-shu px-10 font-display text-xl font-bold tracking-wider text-washi shadow-[0_10px_40px_-10px_rgba(200,67,42,.8)] transition-transform hover:scale-105 active:scale-95"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-shu opacity-20 group-hover:opacity-0" aria-hidden="true" />
          <span className="relative">Iniciar</span>
        </button>
        <p className="text-sm text-washi-dim">Liga o som. Isso é sério.</p>
      </motion.div>
    </section>
  );
}

function Descent() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const far = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const mid = useTransform(scrollYProgress, [0, 1], [320, -520]);
  const near = useTransform(scrollYProgress, [0, 1], [700, -1100]);
  const textOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.3, 0.7], [0.9, 1.1]);

  return (
    <section ref={ref} className="relative h-[170vh] overflow-clip">
      <motion.div aria-hidden="true" style={{ y: far }} className="absolute inset-x-0 top-[10%] text-[#2a2c38]">
        <Cloud className="absolute left-[-5%] w-[45vw] opacity-80" />
        <Cloud className="absolute top-40 right-[-8%] w-[50vw] opacity-70" />
      </motion.div>
      <motion.div aria-hidden="true" style={{ y: mid }} className="absolute inset-x-0 top-[25%] text-[#3a3a44]">
        <Cloud className="absolute left-[20%] w-[55vw]" />
        <Cloud className="absolute top-72 left-[-15%] w-[40vw]" />
      </motion.div>
      <motion.div
        style={{ opacity: textOpacity, scale: textScale }}
        className="sticky top-[45vh] text-center font-display text-[clamp(1.75rem,5vw,3.5rem)] font-bold"
      >
        Mestre, escute com atenção.
      </motion.div>
      <motion.div aria-hidden="true" style={{ y: near }} className="absolute inset-x-0 top-[40%] text-[#d9cfbb]">
        <Cloud className="absolute left-[-10%] w-[70vw] opacity-90" />
        <Cloud className="absolute top-52 right-[-20%] w-[80vw] opacity-95" />
      </motion.div>
    </section>
  );
}
