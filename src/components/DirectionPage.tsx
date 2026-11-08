import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { CallButton } from "@/components/CallButton";
import { MockNotice } from "@/components/MockNotice";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { courses } from "@/data/courses";
import { directionContent } from "@/data/directions";
import { products } from "@/data/products";
import { getSection, sectionHref, subSections, type DirectionId, type Section } from "@/data/sections";
import { services } from "@/data/services";
import { tabibs } from "@/data/tabibs";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, localize, type Locale } from "@/lib/i18n";
import { toneClass } from "@/lib/tone";

export function directionMetadata(id: DirectionId, lang: string): Metadata {
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(getSection(id).title, lang)} — Tabobat Markazi`,
    description: localize(directionContent[id].lede, lang),
  };
}

/**
 * A direction's hub (01–06): what the direction does, its documents, and the
 * pages that live inside it (courses, services and tabibs, Fitobar).
 */
export function DirectionPage({ id, lang }: { id: DirectionId; lang: string }) {
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const section = getSection(id);
  const content = directionContent[id];
  const tone = toneClass[section.tone];

  return (
    <SiteShell lang={lang} current={id}>
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(content.lede)}>
        {content.sample && (
          <div className="mb-8 md:mb-12">
            <MockNotice label={pick(d.mockLabel)} text={pick(d.direction.sampleNotice)} />
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-12 md:gap-x-6">
          <p className="text-xl leading-snug md:col-span-5 md:text-2xl">{pick(content.intro)}</p>

          <div className="md:col-span-7">
            <h2 className="border-b-2 border-ink pb-3 text-sm font-bold tracking-[0.06em] uppercase">
              {pick(d.direction.activities)}
            </h2>
            <ol>
              {content.activities.map((activity, index) => (
                <li
                  key={activity.title.en}
                  className="grid grid-cols-[3.25rem_1fr] gap-x-3 border-b-2 border-ink py-4 md:grid-cols-[4rem_1fr] md:py-5"
                >
                  <span className={`tabular pt-1 text-sm font-bold ${tone.onPaper}`}>
                    {section.number}.{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl leading-tight font-bold tracking-[-0.01em] md:text-2xl">
                      {pick(activity.title)}
                    </h3>
                    <p className="mt-1 max-w-[60ch] leading-snug text-ink-2">{pick(activity.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {content.documents && (
          <div className="mt-14 md:mt-20">
            <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">{pick(d.direction.documents)}</h2>
            <ul className="mt-5 border-t-2 border-ink md:mt-8">
              {content.documents.map((doc) => (
                <li
                  key={doc.title.en}
                  className="flex flex-col gap-1 border-b-2 border-ink py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-lg leading-snug font-bold md:text-xl">{pick(doc.title)}</span>
                  <span className="shrink-0 text-sm font-medium text-ink-2">{pick(doc.kind)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {subSections(id).map((sub) => (
          <SubSectionBlock key={sub.id} sub={sub} lang={lang} pick={pick} />
        ))}

        {id === "integration" && (
          <div className="mt-14 grid gap-6 border-t-2 border-ink pt-6 md:mt-20 md:grid-cols-12 md:gap-x-6 md:pt-8">
            <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] md:col-span-5 md:text-5xl">
              {pick(d.servicesCta)}
            </h2>
            <div className="md:col-span-7">
              <p className="max-w-[52ch] text-lg leading-snug text-ink-2">{pick(d.leaflet.bookingText)}</p>
              <CallButton lang={lang} className="mt-5 w-full sm:w-auto" />
            </div>
          </div>
        )}
      </SectionBand>
    </SiteShell>
  );
}

type Pick = <T>(value: Record<Locale, T>) => T;

/** A page inside the direction, previewed on the hub with a way into it. */
function SubSectionBlock({ sub, lang, pick }: { sub: Section; lang: Locale; pick: Pick }) {
  const href = sectionHref(sub, lang);
  const more: Record<string, Record<Locale, string>> = {
    services: d.allServices,
    tabibs: d.allTabibs,
    fitobar: d.allProducts,
    education: d.allCourses,
  };

  let body: ReactNode = null;
  if (sub.id === "services") {
    body = (
      <ol className="border-t-2 border-ink">
        {services.map((service) => (
          <li key={service.id}>
            <Link
              href={`${href}/${service.id}`}
              className="group flex items-baseline justify-between gap-4 border-b-2 border-ink py-4 no-underline"
            >
              <span className="text-lg leading-tight font-bold group-hover:underline md:text-xl">
                {pick(service.title)}
              </span>
              <span className="tabular shrink-0 font-bold md:text-lg">{pick(service.price)}</span>
            </Link>
          </li>
        ))}
      </ol>
    );
  } else if (sub.id === "tabibs") {
    body = (
      <ol className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
        {tabibs.map((tabib) => (
          <li key={tabib.id} className="group relative">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image src={tabib.image} alt="" fill placeholder="blur" sizes="(min-width: 768px) 30vw, 45vw" className="object-cover" />
              {tabib.mock && (
                <span className="absolute top-0 left-0 bg-pomegranate px-2 py-0.5 text-xs font-bold text-on-pomegranate">
                  {pick(d.mockLabel)}
                </span>
              )}
            </div>
            <h3 className="mt-3 border-t-2 border-ink pt-2 text-lg leading-tight font-bold md:text-xl">
              <Link href={`${href}/${tabib.id}`} className="no-underline after:absolute after:inset-0 group-hover:underline">
                {pick(tabib.name)}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-ink-2">{pick(tabib.role)}</p>
          </li>
        ))}
      </ol>
    );
  } else if (sub.id === "fitobar") {
    body = (
      <ol className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
        {products.map((product) => (
          <li key={product.id} className="group relative">
            <div className="relative aspect-square overflow-hidden bg-stone">
              <Image src={product.image} alt="" fill sizes="(min-width: 768px) 30vw, 45vw" className="object-cover" />
            </div>
            <h3 className="mt-3 border-t-2 border-ink pt-2 text-base leading-tight font-bold md:text-xl">
              <Link href={`${href}#${product.id}`} className="no-underline after:absolute after:inset-0 group-hover:underline">
                {pick(product.title)}
              </Link>
            </h3>
            <p className="tabular mt-1 font-bold md:text-lg">{pick(product.price)}</p>
          </li>
        ))}
      </ol>
    );
  } else if (sub.id === "education") {
    body = (
      <ol className="border-t-2 border-ink">
        {courses.map((course) => (
          <li key={course.id}>
            <Link
              href={`${href}/${course.id}`}
              className="group grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b-2 border-ink py-4 no-underline"
            >
              <span className="text-lg leading-tight font-bold group-hover:underline md:text-xl">{pick(course.title)}</span>
              <span className="tabular font-bold md:text-lg">{pick(course.price)}</span>
              <span className="tabular mt-1 text-sm text-ink-2">{pick(course.duration)}</span>
            </Link>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <section aria-labelledby={`${sub.id}-preview`} className="mt-14 md:mt-20">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4 md:mb-8">
        <h2 id={`${sub.id}-preview`} className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
          {pick(sub.title)}
        </h2>
        <Link
          href={href}
          className="group inline-flex h-12 items-center gap-2 border-2 border-ink px-5 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          {pick(more[sub.id] ?? d.direction.open)}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>
      {body}
    </section>
  );
}
