"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { atos, type Ato, type Motivo } from "@/data/motivos";
import { Icon } from "./Icon";

// Numeração contínua dos motivos entre os atos.
const inicioDoAto = atos.map((_, i) => atos.slice(0, i).reduce((soma, a) => soma + a.motivos.length, 0));

export function Monologue() {
  return (
    <div id="monologo" className="relative">
      <ScrollProgress />
      {atos.map((ato, i) => (
        <ActSection key={ato.numero} ato={ato} startIndex={inicioDoAto[i]} />
      ))}
    </div>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 right-0 left-0 z-40 h-[3px] origin-left bg-shu"
      aria-hidden="true"
    />
  );
}

function ActSection({ ato, startIndex }: { ato: Ato; startIndex: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bigY = useTransform(scrollYProgress, [0, 1], ["20%", "-40%"]);

  return (
    <section ref={ref} className="relative mx-auto max-w-6xl px-4 py-24 sm:px-8 sm:py-32">
      <motion.span
        style={{ y: bigY }}
        className="text-outline pointer-events-none absolute top-10 -right-4 font-display text-[clamp(10rem,30vw,22rem)] leading-none font-extrabold text-washi/10 select-none"
        aria-hidden="true"
      >
        {ato.numero}
      </motion.span>

      <header className="relative mb-16 sm:mb-24">
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          className="mb-3 text-sm tracking-[0.3em] text-shu-light uppercase"
        >
          Ato {ato.numero}
        </motion.p>
        {/* O gatilho fica no h2: o span começa fora da área visível e nunca "entraria na tela". */}
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.8 }}
          className="overflow-hidden pb-[0.08em] font-display text-[clamp(2.75rem,8vw,6rem)] leading-none font-extrabold"
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "105%" }, show: { y: "0%" } }}
            transition={{ duration: 0.9, ease: [0.2, 0.9, 0.2, 1] }}
          >
            {ato.nome}
          </motion.span>
        </motion.h2>
        <svg viewBox="0 0 600 24" className="mt-4 h-5 w-64 text-shu sm:w-96" aria-hidden="true">
          <motion.path
            d="M4 14C80 6 160 18 250 12s200-8 346 2"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
          />
        </svg>
      </header>

      <div className="relative flex flex-col gap-10 sm:gap-16">
        {ato.motivos.map((m, i) => (
          <MotivoCard key={m.titulo} motivo={m} index={startIndex + i} side={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}

function MotivoCard({ motivo, index, side }: { motivo: Motivo; index: number; side: "left" | "right" }) {
  const num = String(index + 1).padStart(2, "0");
  const tilt = side === "left" ? -1.2 : 1.2;

  // O gatilho de "entrar na tela" fica no wrapper: um elemento 100% recortado por clip-path
  // não é detectado pelo IntersectionObserver.
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={`w-full max-w-2xl ${side === "left" ? "self-start" : "self-end"}`}
    >
      <motion.article
        variants={{
          hidden: { opacity: 0, y: 90, rotate: tilt * 4, clipPath: "inset(0 0 100% 0)" },
          show: { opacity: 1, y: 0, rotate: tilt, clipPath: "inset(0 0 0% 0)" },
        }}
        whileHover={{ rotate: 0, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 70, damping: 16 }}
        className="group relative rounded-sm bg-washi p-7 text-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)] sm:p-10"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-[linear-gradient(90deg,#b9ad94,#d8ceb8,#b9ad94)]" aria-hidden="true" />
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-3 bg-[linear-gradient(90deg,#b9ad94,#d8ceb8,#b9ad94)]" aria-hidden="true" />

        <div className="flex items-start gap-5 sm:gap-8">
          <div className="flex flex-col items-center gap-3">
            <span className="font-display text-5xl leading-none font-extrabold text-shu sm:text-7xl">{num}</span>
            <motion.span
              className="flex size-12 items-center justify-center rounded-full border border-ink/20 text-ink sm:size-14"
              whileHover={{ rotate: [0, -14, 12, -8, 0], transition: { duration: 0.6 } }}
            >
              <Icon name={motivo.icone} className="size-6 sm:size-7" />
            </motion.span>
          </div>
          <div className="pt-1">
            <h3 className="font-display text-3xl leading-tight font-extrabold sm:text-5xl">{motivo.titulo}</h3>
            <p className="mt-3 text-lg leading-relaxed text-ink/80 sm:text-xl">{motivo.texto}</p>
          </div>
        </div>

        <span
          className="absolute -right-3 -bottom-3 flex size-14 rotate-12 items-center justify-center rounded-md border-2 border-shu font-display text-[10px] font-extrabold tracking-widest text-shu opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        >
          FATO
        </span>
      </motion.article>
    </motion.div>
  );
}
