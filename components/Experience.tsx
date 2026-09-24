"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { flyTo, flyToY } from "@/lib/flyTo";
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

  // Desce até a frase do mestre, segura um pouco e continua até o monólogo.
  // Se o usuário rolar no meio, a descida automática para ali.
  const begin = () => {
    start();
    document.documentElement.style.overflow = "";
    requestAnimationFrame(async () => {
      const sec = document.getElementById("descida");
      if (!sec) return;
      const top = sec.getBoundingClientRect().top + window.scrollY;
      const vh = window.innerHeight;
      // Ponto em que o progresso da seção é FRASE_PICO (frase inteira na tela).
      const alvo = top - vh + FRASE_PICO * (sec.offsetHeight + vh);
      if (!(await flyToY(alvo, 3))) return;
      await new Promise((r) => setTimeout(r, 2400));
      if (Math.abs(window.scrollY - alvo) > 40) return;
      await flyTo("monologo", 2.6);
    });
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

/** Progresso da descida em que a frase do mestre está inteira na tela (onde a descida automática pausa). */
const FRASE_PICO = 0.54;
const FRASE = ["Mestre,", "escute", "com", "atenção."];

function Descent() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const far = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const mid = useTransform(scrollYProgress, [0, 1], [320, -520]);
  // As nuvens da frente atravessam a tela antes da pausa, deixando a frase livre.
  const near = useTransform(scrollYProgress, [0, 0.5, 1], [900, -900, -1600]);
  const textOpacity = useTransform(scrollYProgress, [0.66, 0.76], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0.34, FRASE_PICO, 0.76], [0.92, 1, 1.12]);

  return (
    <section id="descida" ref={ref} className="relative h-[220vh] overflow-clip">
      <motion.div aria-hidden="true" style={{ y: far }} className="absolute inset-x-0 top-[10%] text-[#2a2c38]">
        <Cloud className="absolute left-[-5%] w-[45vw] opacity-80" />
        <Cloud className="absolute top-40 right-[-8%] w-[50vw] opacity-70" />
      </motion.div>
      <motion.div aria-hidden="true" style={{ y: mid }} className="absolute inset-x-0 top-[25%] text-[#3a3a44]">
        <Cloud className="absolute left-[20%] w-[55vw]" />
        <Cloud className="absolute top-72 left-[-15%] w-[40vw]" />
      </motion.div>
      <motion.p
        style={{ opacity: textOpacity, scale: textScale }}
        className="sticky top-[42vh] z-10 flex flex-wrap justify-center gap-x-[0.3em] px-4 text-center font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-tight font-extrabold [text-shadow:0_4px_30px_rgba(15,13,12,.9)]"
      >
        {FRASE.map((w, i) => (
          <Word key={w} progress={scrollYProgress} from={0.36 + i * 0.035} className={i === 0 ? "text-shu-light" : ""}>
            {w}
          </Word>
        ))}
      </motion.p>
      <motion.div aria-hidden="true" style={{ y: near }} className="absolute inset-x-0 top-[40%] text-[#d9cfbb]">
        <Cloud className="absolute left-[-10%] w-[70vw] opacity-90" />
        <Cloud className="absolute top-52 right-[-20%] w-[80vw] opacity-95" />
      </motion.div>
    </section>
  );
}

/** Palavra que surge (sobe, desfoca → foca) conforme a rolagem passa por `from`. */
function Word({
  progress,
  from,
  className,
  children,
}: {
  progress: MotionValue<number>;
  from: number;
  className?: string;
  children: React.ReactNode;
}) {
  const range = [from, from + 0.06];
  const opacity = useTransform(progress, range, [0, 1]);
  const y = useTransform(progress, range, ["0.6em", "0em"]);
  const filter = useTransform(progress, range, ["blur(10px)", "blur(0px)"]);
  return (
    <motion.span style={{ opacity, y, filter }} className={`inline-block ${className ?? ""}`}>
      {children}
    </motion.span>
  );
}
