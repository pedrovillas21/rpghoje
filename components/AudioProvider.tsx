"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

export type TrackId = "sign" | "orokai" | "ashihira" | "kitetsu";

export const TRACKS: Record<TrackId, { src: string; titulo: string }> = {
  sign: { src: "/audio/sign.mp3", titulo: "Sign" },
  orokai: { src: "/audio/orokai.mp3", titulo: "Orochimaru's Theme" },
  ashihira: { src: "/audio/ashihira.mp3", titulo: "Hollow" },
  kitetsu: { src: "/audio/kitetsu.mp3", titulo: "Torture" },
};

const VOLUME = 0.7;
const FADE_MS = 1400;

type AudioCtx = {
  started: boolean;
  muted: boolean;
  current: TrackId;
  start: () => void;
  /** Toca a faixa na hora. Use dentro de um clique: o navegador só libera o play() em gestos do usuário. */
  play: (id: TrackId) => void;
  setTrack: (id: TrackId) => void;
  toggleMute: () => void;
  /** true enquanto outra mídia (o vídeo do depoimento) está tocando e a trilha fica em pausa. */
  suspended: boolean;
  setSuspended: (on: boolean) => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState<TrackId>("sign");
  const [suspended, setSuspendedState] = useState(false);
  const audios = useRef(new Map<TrackId, HTMLAudioElement>());
  const fades = useRef(new Map<TrackId, number>());
  const startedRef = useRef(false);
  const mutedRef = useRef(false);
  const currentRef = useRef<TrackId>("sign");
  const targetRef = useRef<TrackId | null>(null);
  const suspendedRef = useRef(false);

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

  // Fade por tempo com setInterval: requestAnimationFrame para quando a aba fica oculta
  // e deixaria o volume travado no meio (ou em zero).
  const fade = useCallback((id: TrackId, to: number, onDone?: () => void) => {
    const a = getAudio(id);
    clearInterval(fades.current.get(id));
    const from = a.volume;
    const t0 = performance.now();
    const timer = window.setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / FADE_MS);
      a.volume = from + (to - from) * k;
      if (k >= 1) {
        clearInterval(timer);
        onDone?.();
      }
    }, 30);
    fades.current.set(id, timer);
  }, [getAudio]);

  const crossfadeTo = useCallback((id: TrackId) => {
    if (targetRef.current === id) return;
    targetRef.current = id;
    audios.current.forEach((a, other) => {
      if (other !== id && !a.paused) fade(other, 0, () => a.pause());
    });
    const a = getAudio(id);
    if (a.paused) {
      a.play().catch(() => {
        // Bloqueado pelo navegador: libera nova tentativa no próximo clique.
        if (targetRef.current === id) targetRef.current = null;
      });
    }
    fade(id, VOLUME);
  }, [fade, getAudio]);

  const play = useCallback((id: TrackId) => {
    suspendedRef.current = false;
    setSuspendedState(false);
    startedRef.current = true;
    currentRef.current = id;
    setStarted(true);
    setCurrent(id);
    crossfadeTo(id);
  }, [crossfadeTo]);

  const start = useCallback(() => play(currentRef.current), [play]);

  const setTrack = useCallback((id: TrackId) => {
    currentRef.current = id;
    setCurrent(id);
  }, []);

  // Garantia para navegações sem clique (ex.: botão voltar do navegador).
  useEffect(() => {
    if (startedRef.current && !suspendedRef.current) crossfadeTo(current);
  }, [current, crossfadeTo]);

  const setSuspended = useCallback((on: boolean) => {
    if (suspendedRef.current === on) return;
    suspendedRef.current = on;
    setSuspendedState(on);
    if (on) {
      targetRef.current = null;
      audios.current.forEach((a, id) => {
        if (!a.paused) fade(id, 0, () => a.pause());
      });
    } else if (startedRef.current) {
      crossfadeTo(currentRef.current);
    }
  }, [crossfadeTo, fade]);

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
    <Ctx.Provider value={{ started, muted, current, start, play, setTrack, toggleMute, suspended, setSuspended }}>{children}</Ctx.Provider>
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
