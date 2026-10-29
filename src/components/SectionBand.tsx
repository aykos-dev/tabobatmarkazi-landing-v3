import type { ReactNode } from "react";

import type { Section } from "@/data/sections";
import { toneClass } from "@/lib/tone";

interface SectionBandProps {
  section: Section;
  title: string;
  lede: string;
  children: ReactNode;
  /** h1 when the band opens its own page; h2 inside the homepage. */
  as?: "h1" | "h2";
  /** Address set at scale; defaults to the section's number (e.g. "01", or "01.2" on an item page). */
  number?: string;
  /** A line above the band's grid, such as the way back to the section. */
  crumb?: ReactNode;
}

/**
 * One carton of the range: a full-width colour field carrying the section's
 * address at architectural scale, then its contents on white board.
 */
export function SectionBand({
  section,
  title,
  lede,
  children,
  as: Heading = "h2",
  number = section.number,
  crumb,
}: SectionBandProps) {
  const tone = toneClass[section.tone];
  const headingId = `${section.slug}-title`;
  const long = number.length > 2;

  return (
    <section id={section.slug} data-section={section.id} aria-labelledby={headingId}>
      <div className={`overflow-hidden ${tone.bg} ${tone.fg}`}>
        {crumb && (
          <div className={`mx-auto max-w-[1600px] px-4 pt-4 text-sm font-bold md:px-10 md:pt-6 ${tone.fg2}`}>
            {crumb}
          </div>
        )}
        <div
          className={`mx-auto grid max-w-[1600px] items-end gap-x-4 px-4 pt-6 md:grid-cols-12 md:gap-x-6 md:px-10 md:pt-10 ${
            long ? "grid-cols-1" : "grid-cols-[auto_1fr]"
          }`}
        >
          <span
            aria-hidden
            className={`tabular -mb-[0.16em] leading-[0.8] font-extrabold tracking-[-0.04em] md:col-span-4 ${
              long
                ? "order-last text-[clamp(6.5rem,34vw,13rem)] md:order-none"
                : "text-[clamp(6.5rem,30vw,17rem)]"
            }`}
          >
            {number}
          </span>
          <div className="pb-5 md:col-span-7 md:col-start-6 md:pb-10">
            <Heading
              id={headingId}
              className="text-4xl leading-none font-bold tracking-[-0.03em] md:text-7xl"
            >
              {title}
            </Heading>
            <p className={`mt-3 max-w-[46ch] text-base leading-snug md:mt-5 md:text-xl ${tone.fg2}`}>
              {lede}
            </p>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-10 md:py-14">{children}</div>
    </section>
  );
}
