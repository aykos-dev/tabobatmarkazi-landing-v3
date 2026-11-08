import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { MockNotice } from "@/components/MockNotice";
import { directionContent } from "@/data/directions";
import { getSection, sectionHref, type DirectionId } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { localize, type Locale } from "@/lib/i18n";
import { toneClass } from "@/lib/tone";

/** A direction on the home page: what it does, its areas of work, and the way into its hub. */
export function DirectionSummary({ id, lang }: { id: DirectionId; lang: Locale }) {
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const section = getSection(id);
  const content = directionContent[id];
  const tone = toneClass[section.tone];

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
      <div className="md:col-span-5">
        <p className="text-lg leading-snug md:text-xl">{pick(content.intro)}</p>
        {content.sample && (
          <div className="mt-5">
            <MockNotice label={pick(d.mockLabel)} text={pick(d.direction.sampleNotice)} />
          </div>
        )}
        <Link
          href={sectionHref(section, lang)}
          className="group mt-6 inline-flex h-14 items-center gap-2 border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          {pick(d.direction.open)}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>
      <ol className="border-t-2 border-ink md:col-span-7">
        {content.activities.map((activity, index) => (
          <li
            key={activity.title.en}
            className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-b-2 border-ink py-4 md:grid-cols-[4rem_1fr]"
          >
            <span className={`tabular pt-0.5 text-sm font-bold ${tone.onPaper}`}>
              {section.number}.{index + 1}
            </span>
            <div>
              <h3 className="text-lg leading-tight font-bold md:text-xl">{pick(activity.title)}</h3>
              <p className="mt-1 text-sm leading-snug text-ink-2 md:text-base">{pick(activity.text)}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
