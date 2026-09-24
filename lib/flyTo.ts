import { animate } from "motion/react";

/** Rola a janela até o elemento com uma animação própria (cancelável pelo usuário). */
export function flyTo(id: string, duration = 2.4) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.getBoundingClientRect().top + window.scrollY;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const controls = animate(window.scrollY, target, {
    duration: reduce ? 0 : duration,
    ease: [0.65, 0, 0.25, 1],
    onUpdate: (v) => window.scrollTo(0, v),
  });
  const stop = () => controls.stop();
  window.addEventListener("wheel", stop, { once: true, passive: true });
  window.addEventListener("touchstart", stop, { once: true, passive: true });
  controls.then(() => {
    window.removeEventListener("wheel", stop);
    window.removeEventListener("touchstart", stop);
  });
}
