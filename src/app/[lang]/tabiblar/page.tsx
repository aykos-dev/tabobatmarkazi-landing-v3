import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CallButton } from "@/components/CallButton";
import { MockNotice } from "@/components/MockNotice";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { getSection } from "@/data/sections";
import { tabibs } from "@/data/tabibs";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, localize, type Locale } from "@/lib/i18n";

const section = getSection("tabibs");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(section.title, lang)} — Tabobat Markazi`,
    description: localize(d.tabibsLede, lang),
    // Sample people stay out of search results until real ones replace them.
    robots: tabibs.some((tabib) => tabib.mock) ? { index: false } : undefined,
  };
}

export default async function TabibsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const hasMock = tabibs.some((tabib) => tabib.mock);

  return (
    <SiteShell lang={lang} current="tabibs">
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(d.tabibsLede)}>
        {hasMock && (
          <div className="mb-8 md:mb-12">
            <MockNotice label={pick(d.mockLabel)} text={pick(d.mockNotice)} />
          </div>
        )}

        <ol className="grid gap-y-12 md:grid-cols-3 md:gap-x-6">
          {tabibs.map((tabib, index) => (
            <li key={tabib.id} className="group relative flex flex-col">
              <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                <Image
                  src={tabib.image}
                  alt={pick(tabib.name)}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                />
                {tabib.mock && (
                  <span className="absolute top-0 left-0 bg-pomegranate px-2.5 py-1 text-xs font-bold text-on-pomegranate">
                    {pick(d.mockLabel)}
                  </span>
                )}
              </div>
              <div className="mt-4 grid flex-1 grid-cols-[2.75rem_1fr] border-t-2 border-ink pt-3">
                <span className="tabular pt-1.5 text-sm font-bold text-pomegranate">
                  {section.number}.{index + 1}
                </span>
                <div className="flex flex-col">
                  <h2 className="text-2xl leading-tight font-bold tracking-[-0.02em] md:text-3xl">
                    <Link
                      href={`/${lang}/${section.slug}/${tabib.id}`}
                      className="no-underline after:absolute after:inset-0 group-hover:underline"
                    >
                      {pick(tabib.name)}
                    </Link>
                  </h2>
                  <p className="mt-1 font-medium text-ink-2">{pick(tabib.role)}</p>
                  <p className="mt-3 max-w-[48ch] leading-snug text-ink-2">{pick(tabib.description)}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-bold text-pomegranate">
                    {pick(d.details)}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-6 border-t-2 border-ink pt-6 md:mt-20 md:grid-cols-12 md:gap-x-6 md:pt-8">
          <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] md:col-span-5 md:text-5xl">
            {pick(d.servicesCta)}
          </h2>
          <div className="md:col-span-7">
            <p className="max-w-[52ch] text-lg leading-snug text-ink-2">{pick(d.leaflet.bookingText)}</p>
            <CallButton lang={lang} className="mt-5 w-full sm:w-auto" />
          </div>
        </div>
      </SectionBand>
    </SiteShell>
  );
}
