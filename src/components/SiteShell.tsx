import Image from "next/image";
import type { ReactNode } from "react";

import { CallButton } from "@/components/CallButton";
import { SiteHeader } from "@/components/SiteHeader";
import { sectionHref, sections, type SectionId } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { localize, type Locale } from "@/lib/i18n";

/** Header, footer and the phone call bar every page shares. */
export function SiteShell({
  lang,
  current,
  children,
}: {
  lang: Locale;
  current?: SectionId;
  children: ReactNode;
}) {
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const titled = sections.map((section) => ({
    id: section.id,
    number: section.number,
    tone: section.tone,
    title: pick(section.title),
    href: sectionHref(section, lang),
  }));

  return (
    <>
      <SiteHeader
        lang={lang}
        current={current}
        sections={titled}
        labels={{ menu: pick(d.menu), closeMenu: pick(d.closeMenu), language: pick(d.language), home: `${pick(d.officialName)} — ${titled[0].title}` }}
      />

      <main>{children}</main>

      <footer className="overflow-hidden bg-ink text-on-ink">
        <div className="mx-auto max-w-[1600px] px-4 pt-10 pb-20 md:px-10 md:pb-0">
          <div className="mb-8 flex items-center gap-4 md:mb-10 md:gap-5">
            <Image src="/brand/logo-mark.png" alt="" width={72} height={72} className="size-14 shrink-0 md:size-18" />
            <p className="max-w-[28ch] text-lg leading-tight font-bold md:text-2xl">{pick(d.officialName)}</p>
          </div>
          <nav aria-label={pick(d.menu)}>
            <ol className="grid gap-x-6 border-t-2 border-on-ink-2 sm:grid-cols-2 md:grid-cols-4">
              {titled.map((section) => (
                <li key={section.id} className="border-b border-on-ink-3">
                  <a
                    href={section.href}
                    className="flex gap-4 py-3 text-lg font-bold no-underline hover:underline"
                  >
                    <span className="tabular w-8 text-on-ink-2">{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="mt-8 flex flex-col gap-2 text-sm text-on-ink-2 md:flex-row md:justify-between md:gap-6">
            <p className="max-w-[60ch]">{pick(d.imageNote)}</p>
            <p>© 2026 {pick(d.rights)}</p>
          </div>
          <p aria-hidden className="mt-10 -mb-[0.18em] text-[23vw] leading-[0.8] font-black tracking-[-0.04em] whitespace-nowrap md:text-[min(20.5vw,20rem)]">
            {pick(d.wordmark)}
          </p>
        </div>
      </footer>

      {/* Sticky call bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-ink bg-paper p-2 md:hidden">
        <CallButton lang={lang} className="w-full" />
      </div>
    </>
  );
}
