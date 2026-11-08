import type { Section } from "@/data/sections";

type Tone = Section["tone"];

/** Literal class names per tone so Tailwind can see them. */
export const toneClass: Record<Tone, { bg: string; fg: string; fg2: string; onPaper: string }> = {
  // onPaper: the tone's colour for addresses set on white board (contrast-safe text).
  paper: { bg: "bg-paper", fg: "text-on-paper", fg2: "text-on-paper-2", onPaper: "text-on-paper" },
  herb: { bg: "bg-herb", fg: "text-on-herb", fg2: "text-on-herb-2", onPaper: "text-herb" },
  ink: { bg: "bg-ink", fg: "text-on-ink", fg2: "text-on-ink-2", onPaper: "text-on-paper" },
  pomegranate: {
    bg: "bg-pomegranate",
    fg: "text-on-pomegranate",
    fg2: "text-on-pomegranate-2",
    onPaper: "text-pomegranate",
  },
  saffron: { bg: "bg-saffron", fg: "text-on-saffron", fg2: "text-on-saffron-2", onPaper: "text-on-saffron-2" },
  cobalt: { bg: "bg-cobalt", fg: "text-on-cobalt", fg2: "text-on-cobalt-2", onPaper: "text-cobalt" },
  stone: { bg: "bg-stone", fg: "text-on-stone", fg2: "text-on-stone-2", onPaper: "text-on-stone-2" },
};
