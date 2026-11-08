import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { getSection, sectionHref, shortTitle, type Section } from "@/data/sections";
import { localize, type Locale } from "@/lib/i18n";

/** The way back from a page inside a direction to the direction's hub ("← 03 Integratsiyalash"). */
export function DirectionCrumb({ section, lang }: { section: Section; lang: Locale }) {
  if (!section.parent) return null;
  const direction = getSection(section.parent);
  return (
    <Link href={sectionHref(direction, lang)} className="inline-flex items-center gap-2 no-underline hover:underline">
      <ArrowLeft aria-hidden className="size-4" strokeWidth={2.5} />
      <span className="tabular">{direction.number}</span> {localize(shortTitle(direction), lang)}
    </Link>
  );
}
