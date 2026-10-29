import { ArrowDown } from "lucide-react";

import { SweepLink } from "@/components/SweepLink";
import type { Section } from "@/data/sections";
import { toneClass } from "@/lib/tone";

export interface RangeItem {
  section: Section;
  title: string;
  fact: string;
  href: string;
}

/** The whole range on one shelf: each section's colour, address and one real fact. */
export function RangeStrip({ items, label }: { items: RangeItem[]; label: string }) {
  return (
    <nav aria-label={label} className="border-y-2 border-ink">
      <ol className="grid md:grid-cols-6">
        {items.map(({ section, title, fact, href }) => {
          const tone = toneClass[section.tone];
          return (
            <li key={section.id} className="md:border-r-2 md:border-ink md:last:border-r-0">
              <SweepLink
                href={href}
                tone={section.tone}
                number={section.number}
                title={title}
                className={`group grid h-12 grid-cols-[2.75rem_1fr_auto] items-center px-4 no-underline transition-[filter] duration-200 hover:brightness-110 md:min-h-28 md:grid-cols-1 md:grid-rows-[auto_1fr_auto] md:items-start md:px-5 md:py-3 ${tone.bg} ${tone.fg}`}
              >
                <span className="tabular text-sm font-bold md:text-base">{section.number}</span>
                <span className="text-[0.95rem] font-bold md:self-end md:text-xl md:tracking-[-0.02em]">
                  {title}
                </span>
                <span className={`tabular flex items-center gap-1.5 text-xs whitespace-nowrap md:mt-1 md:text-sm ${tone.fg2}`}>
                  {fact}
                  <ArrowDown
                    aria-hidden
                    className="hidden size-4 transition-transform duration-300 ease-out group-hover:translate-y-0.5 md:block"
                  />
                </span>
              </SweepLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
