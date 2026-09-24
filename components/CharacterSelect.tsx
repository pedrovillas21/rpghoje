"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { personagens, type Personagem } from "@/data/personagens";
import { useAudio } from "./AudioProvider";

export function CharacterSelect() {
  return (
    <section id="personagens" className="relative mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <header className="mb-14 text-center sm:mb-20">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 text-sm tracking-[0.3em] text-shu-light uppercase"
        >
          A equipe
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-none font-extrabold"
        >
          Os ninjas estão prontos
        </motion.h2>
        <p className="mt-4 text-lg text-washi-dim">Só falta o mestre. Escolha um para ver a ficha.</p>
      </header>

      <div className="grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-10">
        {personagens.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 60, damping: 14, delay: i * 0.15 }}
          >
            <TiltCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TiltCard({ p }: { p: Personagem }) {
  const { play } = useAudio();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 150, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 150, damping: 18 });
  const gx = useTransform(mx, (v) => `${v * 100}%`);
  const gy = useTransform(my, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.22), transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <Link
      href={`/personagem/${p.slug}`}
      onClick={() => play(p.track)}
      onPointerMove={reduce ? undefined : onMove}
      onPointerLeave={onLeave}
      className="group block [perspective:1200px]"
      style={{ "--accent": p.cor } as React.CSSProperties}
    >
      <motion.div
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative aspect-[3/4.4] overflow-hidden rounded-xl border border-washi/10 bg-ink-2 shadow-[0_30px_80px_-30px_rgba(0,0,0,.9)] transition-shadow duration-500 group-hover:shadow-[0_0_60px_-10px_var(--accent)]"
      >
        <Image
          src={p.retrato}
          alt={`Retrato de ${p.nome} ${p.sobrenome}`}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <motion.div style={{ background: glare }} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7" style={{ transform: "translateZ(40px)" }}>
          <p className="mb-2 text-xs font-bold tracking-[0.25em] uppercase" style={{ color: p.cor }}>
            Clã {p.cla} · {p.rank}
          </p>
          <h3 className="font-display text-4xl leading-none font-extrabold sm:text-5xl">
            {p.nome}
            <span className="block text-washi-dim">{p.sobrenome}</span>
          </h3>
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-washi/15 pt-4 text-sm">
            <span className="flex items-center gap-2 text-washi-dim">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
              {p.tema ?? "Tema em breve"}
            </span>
            <span className="flex items-center gap-1 font-bold transition-transform group-hover:translate-x-1" style={{ color: p.cor }}>
              Ver ficha
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
