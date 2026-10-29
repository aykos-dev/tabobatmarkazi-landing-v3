import type { Section } from "@/data/sections";

type Tone = Section["tone"];

/** Literal class names per tone so Tailwind can see them. */
export const toneClass: Record<Tone, { bg: string; fg: string; fg2: string }> = {
  paper: { bg: "bg-paper", fg: "text-on-paper", fg2: "text-on-paper-2" },
  herb: { bg: "bg-herb", fg: "text-on-herb", fg2: "text-on-herb-2" },
  ink: { bg: "bg-ink", fg: "text-on-ink", fg2: "text-on-ink-2" },
  pomegranate: { bg: "bg-pomegranate", fg: "text-on-pomegranate", fg2: "text-on-pomegranate-2" },
  saffron: { bg: "bg-saffron", fg: "text-on-saffron", fg2: "text-on-saffron-2" },
  cobalt: { bg: "bg-cobalt", fg: "text-on-cobalt", fg2: "text-on-cobalt-2" },
  stone: { bg: "bg-stone", fg: "text-on-stone", fg2: "text-on-stone-2" },
};
