"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SweepLink } from "@/components/SweepLink";
import type { Section } from "@/data/sections";
import { locales, type Locale } from "@/lib/i18n";
import { toneClass } from "@/lib/tone";

export interface HeaderSection {
  id: Section["id"];
  number: string;
  tone: Section["tone"];
  title: string;
  href: string;
}

interface SiteHeaderProps {
  lang: Locale;
  sections: HeaderSection[];
  labels: { menu: string; closeMenu: string; language: string; home: string };
  /** Section whose address the bar shows before any band scrolls under it. */
  current?: Section["id"];
}

/** Top bar: the address of the section being read, languages, and the numbered menu. */
export function SiteHeader({ lang, sections, labels, current: initial = "home" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(
    () => sections.find((section) => section.id === initial) ?? sections[0],
  );
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // The address in the bar follows the band under it.
  useEffect(() => {
    const bands = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-section");
          const match = sections.find((section) => section.id === id);
          if (match) setCurrent(match);
        }
      },
      { rootMargin: "-56px 0px -70% 0px" },
    );
    bands.forEach((band) => observer.observe(band));
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      toggleRef.current?.focus();
    };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
        <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-4 px-4 md:px-10">
          <a
            href={`/${lang}`}
            aria-label={labels.home}
            className="flex min-w-0 items-center gap-3 text-sm font-bold no-underline"
          >
            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={36}
              height={36}
              priority
              className="size-9 shrink-0"
            />
            <span aria-hidden className="flex min-w-0 items-baseline gap-2">
              <span className="tabular">{current.number}</span>
              <span className="truncate">{current.title}</span>
            </span>
          </a>

          <div className="flex items-center gap-5">
            <nav aria-label={labels.language} className="flex text-sm">
              {locales.map((locale) => (
                <a
                  key={locale}
                  href={pathname.replace(/^\/(uz|ru|en)(?=\/|$)/, `/${locale}`)}
                  hrefLang={locale}
                  aria-current={locale === lang ? "true" : undefined}
                  className={`px-1.5 py-1 uppercase no-underline ${
                    locale === lang
                      ? "font-bold underline"
                      : "text-ink-2 hover:text-ink"
                  }`}
                >
                  {locale}
                </a>
              ))}
            </nav>
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
              className="flex h-10 items-center gap-2 text-sm font-bold"
            >
              <span className="hidden sm:inline">{labels.menu}</span>
              <Menu aria-hidden className="size-6" strokeWidth={2.25} />
              <span className="sr-only sm:hidden">{labels.menu}</span>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="site-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-paper"
        >
          <div className="flex h-14 shrink-0 items-center justify-end border-b-2 border-ink px-4 md:px-10">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 items-center gap-2 text-sm font-bold"
            >
              {labels.closeMenu}
              <X aria-hidden className="size-6" strokeWidth={2.25} />
            </button>
          </div>
          <nav aria-label={labels.menu} className="flex flex-1 flex-col">
            <ol className="flex flex-1 flex-col">
              {sections.map((section) => {
                const tone = toneClass[section.tone];
                return (
                  <li key={section.id} className="flex flex-1">
                    <SweepLink
                      href={section.href}
                      tone={section.tone}
                      number={section.number}
                      title={section.title}
                      onNavigate={() => setOpen(false)}
                      className={`flex min-h-16 flex-1 items-center gap-5 border-b-2 border-ink px-4 text-3xl font-bold tracking-[-0.02em] no-underline md:px-10 md:text-5xl ${tone.bg} ${tone.fg}`}
                    >
                      <span className={`tabular w-12 text-base md:w-20 md:text-2xl ${tone.fg2}`}>
                        {section.number}
                      </span>
                      {section.title}
                    </SweepLink>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>
      )}
    </>
  );
}
