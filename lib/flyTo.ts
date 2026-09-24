import { animate } from "motion/react";

/**
 * Rola a janela até a posição Y com uma animação própria.
 * Resolve `true` se chegou ao destino e `false` se o usuário interrompeu rolando.
 */
export function flyToY(target: number, duration = 2.4): Promise<boolean> {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return new Promise((resolve) => {
    const cleanup = () => {
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
    };
    const controls = animate(window.scrollY, target, {
      duration: reduce ? 0 : duration,
      ease: [0.65, 0, 0.25, 1],
      onUpdate: (v) => window.scrollTo(0, v),
      onComplete: () => {
        cleanup();
        resolve(true);
      },
    });
    function stop() {
      controls.stop();
      cleanup();
      resolve(false);
    }
    window.addEventListener("wheel", stop, { once: true, passive: true });
    window.addEventListener("touchstart", stop, { once: true, passive: true });
  });
}

/** Rola a janela até o elemento com o id dado. */
export function flyTo(id: string, duration = 2.4) {
  const el = document.getElementById(id);
  if (!el) return Promise.resolve(false);
  return flyToY(el.getBoundingClientRect().top + window.scrollY, duration);
}
