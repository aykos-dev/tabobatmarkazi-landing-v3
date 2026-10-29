"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { Section } from "@/data/sections";
import { toneClass } from "@/lib/tone";

export interface SweepDetail {
  tone: Section["tone"];
  number: string;
  title: string;
}

export const SWEEP_EVENT = "tabobat:sweep";
export const SWEEP_IN_MS = 420;
const SWEEP_OUT_MS = 520;

/** The colour panel that rises over the page when a visitor moves between sections. */
export function Sweep() {
  const [detail, setDetail] = useState<SweepDetail | null>(null);
  const [state, setState] = useState<"in" | "out">("in");
  const pathname = usePathname();

  // After a page change, settle on the hash target the visitor asked for.
  useEffect(() => {
    // Next writes the URL after this effect runs, so read the hash each frame.
    const until = performance.now() + 1500;
    let timer = 0;
    const land = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: "instant", block: "start" });
      else if (performance.now() < until) timer = window.setTimeout(land, 50);
    };
    timer = window.setTimeout(land, 0);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    let outTimer: number | undefined;
    let doneTimer: number | undefined;

    function onSweep(event: Event) {
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
      setDetail((event as CustomEvent<SweepDetail>).detail);
      setState("in");
      outTimer = window.setTimeout(() => setState("out"), SWEEP_IN_MS + 60);
      doneTimer = window.setTimeout(
        () => setDetail(null),
        SWEEP_IN_MS + 60 + SWEEP_OUT_MS,
      );
    }

    window.addEventListener(SWEEP_EVENT, onSweep);
    return () => {
      window.removeEventListener(SWEEP_EVENT, onSweep);
      window.clearTimeout(outTimer);
      window.clearTimeout(doneTimer);
    };
  }, []);

  if (!detail) return null;
  const tone = toneClass[detail.tone];

  return (
    <div
      aria-hidden
      data-state={state}
      className={`sweep flex flex-col justify-end overflow-hidden px-4 pb-6 md:px-10 md:pb-10 ${tone.bg} ${tone.fg}`}
    >
      <span className="tabular text-[clamp(7rem,34vw,22rem)] leading-[0.78] font-extrabold tracking-[-0.04em]">
        {detail.number}
      </span>
      <span className="mt-4 text-4xl font-bold tracking-[-0.02em] md:text-6xl">
        {detail.title}
      </span>
    </div>
  );
}
