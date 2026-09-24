"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type TrackId = "sign" | "orokai" | "ashihira";

export const TRACKS: Record<TrackId, { src: string; titulo: string }> = {
  sign: { src: "/audio/sign.mp3", titulo: "Sign" },
  orokai: { src: "/audio/orokai.mp3", titulo: "Orochimaru's Theme" },
  ashihira: { src: "/audio/ashihira.mp3", titulo: "Hollow" },
};

const VOLUME = 0.7;
const FADE_MS = 1400;

type AudioCtx = {
  started: boolean;
  muted: boolean;
  current: TrackId;
  start: () => void;
  setTrack: (id: TrackId) => void;
  toggleMute: () => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState<TrackId>("sign");
  const audios = useRef(new Map<TrackId, HTMLAudioElement>());
  const fades = useRef(new Map<TrackId, number>());
  const startedRef = useRef(false);
  const mutedRef = useRef(false);

  const getAudio = useCallback((id: TrackId) => {
    let a = audios.current.get(id);
    if (!a) {
      a = new Audio(TRACKS[id].src);
      a.loop = true;
      a.preload = "auto";
      a.volume = 0;
      a.muted = mutedRef.current;
      audios.current.set(id, a);
    }
    return a;
  }, []);

  const fade = useCallback((id: TrackId, to: number, onDone?: () => void) => {
    const a = getAudio(id);
    cancelAnimationFrame(fades.current.get(id) ?? 0);
    const from = a.volume;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / FADE_MS);
      a.volume = from + (to - from) * k;
      if (k < 1) fades.current.set(id, requestAnimationFrame(step));
      else onDone?.();
    };
    fades.current.set(id, requestAnimationFrame(step));
  }, [getAudio]);

  // Chamado dentro do gesto do usuário para que o navegador libere o play().
  const crossfadeTo = useCallback((id: TrackId) => {
    audios.current.forEach((a, other) => {
      if (other !== id && !a.paused) fade(other, 0, () => a.pause());
    });
    const a = getAudio(id);
    if (a.paused) a.play().catch(() => {});
    fade(id, VOLUME);
  }, [fade, getAudio]);

  const start = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    crossfadeTo(current);
  }, [crossfadeTo, current]);

  const setTrack = useCallback((id: TrackId) => setCurrent(id), []);

  useEffect(() => {
    if (startedRef.current) crossfadeTo(current);
  }, [current, crossfadeTo]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    setMuted(mutedRef.current);
    audios.current.forEach((a) => (a.muted = mutedRef.current));
  }, []);

  useEffect(() => {
    const map = audios.current;
    return () => map.forEach((a) => a.pause());
  }, []);

  return (
    <Ctx.Provider value={{ started, muted, current, start, setTrack, toggleMute }}>{children}</Ctx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio precisa estar dentro de <AudioProvider>");
  return ctx;
}

/** Define qual música toca enquanto o componente estiver montado. */
export function useTrack(id: TrackId) {
  const { setTrack } = useAudio();
  useEffect(() => setTrack(id), [id, setTrack]);
}
