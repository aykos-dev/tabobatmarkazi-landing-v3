import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CallButton } from "@/components/CallButton";
import { MockNotice } from "@/components/MockNotice";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { getSection, sectionHref } from "@/data/sections";
import { getService } from "@/data/services";
import { getTabib, tabibs } from "@/data/tabibs";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, locales, localize, type Locale, type Localized } from "@/lib/i18n";

const section = getSection("tabibs");
const services = getSection("services");

export function generateStaticParams() {
  return locales.flatMap((lang) => tabibs.map((tabib) => ({ lang, slug: tabib.id })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const tabib = getTabib(slug);
  if (!isLocale(lang) || !tabib) return {};
  return {
    title: `${localize(tabib.name, lang)} — Tabobat Markazi`,
    description: localize(tabib.role, lang),
    robots: tabib.mock ? { index: false } : undefined,
  };
}

export default async function TabibPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const tabib = getTabib(slug);
  if (!isLocale(lang) || !tabib) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  const index = tabibs.indexOf(tabib);
  const others = tabibs.filter((other) => other.id !== tabib.id);
  const performs = (tabib.services ?? []).map(getService).filter((service) => service !== undefined);

  const spec = (
    [
      [d.tabibSpec.specialty, tabib.role],
      [d.tabibSpec.experience, tabib.experience],
      [d.tabibSpec.education, tabib.education],
      [d.tabibSpec.schedule, tabib.schedule],
    ] as [Localized<string>, Localized<string> | undefined][]
  ).filter((row): row is [Localized<string>, Localized<string>] => Boolean(row[1]));

  return (
    <SiteShell lang={lang} current="tabibs">
      <SectionBand
        as="h1"
        section={section}
        number={`${section.number}.${index + 1}`}
        title={pick(tabib.name)}
        lede={pick(tabib.role)}
        crumb={
          <Link href={sectionHref(section, lang)} className="inline-flex items-center gap-2 no-underline hover:underline">
            <ArrowLeft aria-hidden className="size-4" strokeWidth={2.5} />
            <span className="tabular">{section.number}</span> {pick(section.title)}
          </Link>
        }
      >
        {tabib.mock && (
          <div className="mb-8 md:mb-12">
            <MockNotice label={pick(d.mockLabel)} text={pick(d.mockNotice)} />
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-12 md:gap-x-6">
          <figure className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-stone">
              <Image
                src={tabib.image}
                alt={pick(tabib.name)}
                fill
                priority
                placeholder="blur"
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
              {tabib.mock && (
                <span className="absolute top-0 left-0 bg-pomegranate px-2.5 py-1 text-xs font-bold text-on-pomegranate">
                  {pick(d.mockLabel)}
                </span>
              )}
            </div>
          </figure>

          <div className="md:col-span-6 md:col-start-7">
            <p className="max-w-[52ch] text-xl leading-snug md:text-2xl">{pick(tabib.description)}</p>

            <dl className="mt-8 border-t-2 border-ink">
              {spec.map(([label, value]) => (
                <div key={label.en} className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm text-ink-2 sm:pt-0.5">{pick(label)}</dt>
                  <dd className="text-lg font-bold">{pick(value)}</dd>
                </div>
              ))}
              {performs.length > 0 && (
                <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                  <dt className="text-sm text-ink-2 sm:pt-0.5">{pick(d.tabibSpec.services)}</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-1 text-lg font-bold">
                    {performs.map((service) => (
                      <Link key={service.id} href={`/${lang}/${services.slug}/${service.id}`}>
                        {pick(service.title)}
                      </Link>
                    ))}
                  </dd>
                </div>
              )}
              <div className="grid gap-1 border-b-2 border-ink py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt className="text-sm text-ink-2 sm:pt-0.5">{pick(d.leaflet.booking)}</dt>
                <dd className="text-lg font-bold">{pick(d.leaflet.byPhone)}</dd>
              </div>
            </dl>
            <CallButton lang={lang} className="mt-6 w-full sm:w-auto" />
          </div>
        </div>

        <nav aria-labelledby="other-tabibs" className="mt-14 md:mt-24">
          <h2 id="other-tabibs" className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            {pick(d.otherTabibs)}
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 md:mt-8">
            {others.map((other) => (
              <li key={other.id} className="group relative grid grid-cols-[5.5rem_1fr_auto] items-center gap-4 border-t-2 border-ink pt-4 md:grid-cols-[7rem_1fr_auto]">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image src={other.image} alt="" fill placeholder="blur" sizes="7rem" className="object-cover" />
                </div>
                <div>
                  <span className="tabular text-sm font-bold text-pomegranate">
                    {section.number}.{tabibs.indexOf(other) + 1}
                  </span>
                  <h3 className="mt-0.5 text-lg leading-tight font-bold md:text-2xl">
                    <Link
                      href={`/${lang}/${section.slug}/${other.id}`}
                      className="no-underline after:absolute after:inset-0 group-hover:underline"
                    >
                      {pick(other.name)}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm font-medium text-ink-2">{pick(other.role)}</p>
                </div>
                <ArrowRight
                  aria-hidden
                  className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                  strokeWidth={2.25}
                />
              </li>
            ))}
          </ol>
        </nav>
      </SectionBand>
    </SiteShell>
  );
}
