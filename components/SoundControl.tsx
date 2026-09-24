"use client";

import { AnimatePresence, motion } from "motion/react";
import { TRACKS, useAudio } from "./AudioProvider";

export function SoundControl() {
  const { started, muted, current, start, toggleMute, suspended } = useAudio();

  return (
    <div className="fixed top-4 right-4 z-50 sm:top-6 sm:right-6">
      <AnimatePresence mode="wait">
        {started ? (
          <motion.button
            key="on"
            type="button"
            onClick={toggleMute}
            aria-label={muted ? "Ativar som" : "Silenciar música"}
            aria-pressed={muted}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-11 items-center gap-3 rounded-full border border-washi/15 bg-ink/70 py-2 pr-4 pl-3 text-sm backdrop-blur-md transition-colors hover:border-washi/40"
          >
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`eq-bar block w-[3px] rounded-sm bg-shu-light ${muted || suspended ? "[animation-play-state:paused]" : ""}`}
                  style={{ height: "100%", animationDelay: `${i * 0.15}s`, opacity: muted || suspended ? 0.35 : 1 }}
                />
              ))}
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={current + String(muted) + String(suspended)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="max-w-40 truncate text-washi-dim"
              >
                {muted ? "Som desligado" : suspended ? "Pausada no depoimento" : TRACKS[current].titulo}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        ) : (
          <motion.button
            key="off"
            type="button"
            onClick={start}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex min-h-11 items-center gap-2 rounded-full border border-washi/15 bg-ink/70 px-4 py-2 text-sm text-washi-dim backdrop-blur-md hover:border-washi/40"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />
            </svg>
            Ativar som
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
