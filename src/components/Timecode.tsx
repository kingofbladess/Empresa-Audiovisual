"use client";

import { useEffect, useState } from "react";

/** Contador de tiempo estilo cámara (HH:MM:SS:FF a 24 fps). */
export function Timecode() {
  const [frames, setFrames] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      setFrames(Math.floor(((t - start) / 1000) * 24));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const ff = frames % 24;
  const s = Math.floor(frames / 24);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span className="tabular-nums">
      {pad(Math.floor(s / 3600))}:{pad(Math.floor(s / 60) % 60)}:{pad(s % 60)}:{pad(ff)}
    </span>
  );
}
