"use client";

import { animate, motion, useInView, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { personagens, type Personagem } from "@/data/personagens";
import { useAudio, useTrack } from "./AudioProvider";

const MAX_ATRIBUTO = 25;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: [0.2, 0.9, 0.2, 1] as const },
};

export function CharacterProfile({ p }: { p: Personagem }) {
  useTrack(p.track);
  const { play } = useAudio();

  const idx = personagens.findIndex((x) => x.slug === p.slug);
  const proximo = personagens[(idx + 1) % personagens.length];

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);

  return (
    <main className="relative min-h-svh" style={{ "--accent": p.cor } as React.CSSProperties}>
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-40"
        style={{ background: `radial-gradient(80% 60% at 20% 10%, ${p.cor}33, transparent 60%)` }}
        aria-hidden="true"
      />

      <nav className="fixed top-4 left-4 z-50 sm:top-6 sm:left-6">
        <Link
          href="/#personagens"
          onClick={() => play("sign")}
          className="flex min-h-11 items-center gap-2 rounded-full border border-washi/15 bg-ink/70 px-4 py-2 text-sm backdrop-blur-md hover:border-washi/40"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" />
          </svg>
          Voltar
        </Link>
      </nav>

      {/* Hero */}
      <section ref={heroRef} className="relative mx-auto grid max-w-7xl gap-10 px-4 pt-24 pb-16 sm:px-8 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-16 md:pt-28">
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)", opacity: 0.4 }}
          animate={{ clipPath: "inset(0% 0 0 0)", opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.7, 0, 0.2, 1] }}
          className="relative aspect-[3/4] overflow-hidden rounded-xl border border-washi/10 shadow-[0_0_90px_-20px_var(--accent)]"
        >
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[10%] inset-x-0">
            <Image src={p.retrato} alt={`Retrato de ${p.nome} ${p.sobrenome}`} fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
        </motion.div>

        <div>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-4 text-sm font-bold tracking-[0.3em] uppercase"
            style={{ color: p.cor }}
          >
            {p.rank} · Nível {p.nivel}
          </motion.p>
          <h1 className="font-display text-[clamp(3.5rem,9vw,7.5rem)] leading-[0.9] font-extrabold">
            {[p.nome, p.sobrenome].map((w, i) => (
              <span key={w} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className={`block ${i === 1 ? "text-washi-dim" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.4 + i * 0.15, duration: 1, ease: [0.2, 0.9, 0.2, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="relative mt-8 border-t border-washi/15 pt-6 font-display text-xl leading-snug font-bold sm:text-2xl"
          >
            <span className="absolute -top-5 left-0 font-display text-6xl leading-none" style={{ color: p.cor }} aria-hidden="true">
              “
            </span>
            {p.lema}
          </motion.blockquote>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 1.2 } } }}
            className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3"
          >
            {[
              ["Clã", p.cla],
              ["Idade", `${p.idade} anos`],
              ["Altura", p.altura],
              ["Vila de origem", p.vilaOrigem],
              ["Atua em", p.atuacao],
              ["Tendência", p.tendencia],
            ].map(([k, v]) => (
              <motion.div
                key={k}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                className="rounded-lg border border-washi/10 bg-ink-2/80 px-4 py-3"
              >
                <dt className="text-xs tracking-wider text-washi-dim uppercase">{k}</dt>
                <dd className="mt-1 font-bold">{v}</dd>
              </motion.div>
            ))}
          </motion.dl>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }} className="mt-6 flex items-center gap-2 text-sm text-washi-dim">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            {p.tema ? `Tema: ${p.tema}` : "Tema em breve. Por enquanto, toca Sign."}
          </motion.p>
        </div>
      </section>

      {/* Vitais */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <SectionTitle>Status</SectionTitle>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {p.vitais.map((v, i) => (
            <motion.div key={v.nome} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="rounded-xl border border-washi/10 bg-ink-2/80 p-5 sm:p-6">
              <p className="text-sm tracking-wider text-washi-dim uppercase">{v.nome}</p>
              <p className="mt-2 font-display text-5xl font-extrabold sm:text-6xl" style={{ color: p.cor }}>
                <CountUp value={v.valor} />
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Atributos + Poderes */}
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionTitle>Atributos</SectionTitle>
          {/* O gatilho fica na lista: a barra começa com largura 0 e o IntersectionObserver
              não detecta elementos sem área, então ela nunca "entraria na tela". */}
          <motion.ul initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }} className="space-y-4">
            {p.atributos.map((a, i) => (
              <li key={a.nome}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span>{a.nome}</span>
                  <span className="font-bold tabular-nums">{a.valor}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-washi/10">
                  <motion.div
                    className="h-full origin-left rounded-full"
                    style={{ background: p.cor, width: `${(a.valor / MAX_ATRIBUTO) * 100}%` }}
                    variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
                    transition={{ duration: 1.1, delay: i * 0.07, ease: [0.2, 0.9, 0.2, 1] }}
                  />
                </div>
              </li>
            ))}
          </motion.ul>
        </div>

        <div>
          <SectionTitle>Poderes</SectionTitle>
          <ul className="space-y-3">
            {p.poderes.map((pw, i) => (
              <motion.li
                key={pw.nome}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.07 }}
                className="rounded-xl border border-washi/10 bg-ink-2/80 p-4 sm:p-5"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-xl font-bold">{pw.nome}</span>
                  {pw.nivel !== undefined && (
                    <span className="text-sm font-bold whitespace-nowrap" style={{ color: p.cor }}>
                      Nv {pw.nivel}
                    </span>
                  )}
                </div>
                {pw.nivel !== undefined && (
                  <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="mt-3 flex h-1.5 gap-1"
                    aria-hidden="true"
                  >
                    {Array.from({ length: 10 }, (_, k) => (
                      <motion.span
                        key={k}
                        className="h-full flex-1 rounded-full"
                        style={{ background: k < pw.nivel! ? p.cor : "rgba(239,230,210,.1)" }}
                        variants={{ hidden: { opacity: 0, scaleY: 0 }, show: { opacity: 1, scaleY: 1 } }}
                        transition={{ delay: 0.3 + k * 0.04 }}
                      />
                    ))}
                  </motion.div>
                )}
                {pw.detalhe && <p className="mt-2 text-sm text-washi-dim">{pw.detalhe}</p>}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pontos fortes */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <SectionTitle>Pontos fortes</SectionTitle>
        <ol className="grid gap-4 md:grid-cols-2">
          {p.pontosFortes.map((f, i) => (
            <motion.li
              key={f}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: (i % 2) * 0.1 }}
              className="flex gap-4 rounded-xl border border-washi/10 bg-ink-2/80 p-5"
            >
              <span className="font-display text-3xl leading-none font-extrabold" style={{ color: p.cor }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-lg leading-snug">{f}</span>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Invocações */}
      {p.invocacoes && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
          <SectionTitle>Invocações</SectionTitle>
          <div className="grid gap-6 sm:grid-cols-2">
            {p.invocacoes.map((inv, i) => (
              <motion.figure
                key={inv.nome}
                initial={{ opacity: 0, scale: 0.9, rotate: i ? 3 : -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.03 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 80, damping: 14 }}
                className="relative aspect-square overflow-hidden rounded-xl border border-washi/10"
              >
                <Image src={inv.imagem} alt={`Invocação ${inv.nome}`} fill sizes="(min-width: 640px) 45vw, 100vw" className="object-cover" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-5 font-display text-3xl font-extrabold">
                  {inv.nome}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>
      )}

      {/* História */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
        <SectionTitle>História</SectionTitle>
        {p.historia ? (
          <div className="space-y-5 text-lg leading-relaxed text-washi/90 sm:text-xl">
            {p.historia.map((par, i) => (
              <motion.p key={i} {...fadeUp}>
                {par}
              </motion.p>
            ))}
          </div>
        ) : (
          <motion.div {...fadeUp} className="rounded-xl border border-dashed border-washi/25 p-8 text-center sm:p-12">
            <p className="font-display text-2xl font-bold sm:text-3xl">Pergaminho ainda selado</p>
            <p className="mt-3 text-washi-dim">
              {p.slug === "kitetsu"
                ? "A história do Kitetsu começa a ser escrita na mesa. Mais um motivo para ser sábado."
                : "A história chega em breve."}
            </p>
          </motion.div>
        )}
      </section>

      {/* Extras */}
      {p.extras && (
        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-8 md:grid-cols-3">
          {p.extras.map((ex) => (
            <motion.div key={ex.titulo} {...fadeUp} className="rounded-xl border border-washi/10 bg-ink-2/80 p-6">
              <h3 className="mb-3 text-sm font-bold tracking-[0.2em] uppercase" style={{ color: p.cor }}>
                {ex.titulo}
              </h3>
              <ul className="space-y-2">
                {ex.itens.map((it) => (
                  <li key={it} className="text-lg">
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </section>
      )}

      {/* Próximo */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-24 sm:px-8">
        <Link
          href={`/personagem/${proximo.slug}`}
          onClick={() => play(proximo.track)}
          className="group flex items-center justify-between gap-6 rounded-xl border border-washi/10 bg-ink-2/80 p-6 transition-colors hover:border-washi/30 sm:p-8"
        >
          <span>
            <span className="block text-sm tracking-[0.2em] text-washi-dim uppercase">Próximo ninja</span>
            <span className="mt-1 block font-display text-3xl font-extrabold sm:text-5xl" style={{ color: proximo.cor }}>
              {proximo.nome} {proximo.sobrenome}
            </span>
          </span>
          <svg className="size-8 shrink-0 transition-transform group-hover:translate-x-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </section>
    </main>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2 {...fadeUp} className="mb-6 flex items-center gap-4 font-display text-3xl font-extrabold sm:text-4xl">
      <span className="h-px w-10 bg-[var(--accent)]" aria-hidden="true" />
      {children}
    </motion.h2>
  );
}

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(0, value, {
      duration: reduce ? 0 : 1.6,
      ease: [0.2, 0.9, 0.2, 1],
      onUpdate: (v) => (el.textContent = String(Math.round(v))),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
