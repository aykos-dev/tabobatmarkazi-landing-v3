import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CallButton } from "@/components/CallButton";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { contact } from "@/data/contact";
import { getSection, sectionHref } from "@/data/sections";
import { getService, services } from "@/data/services";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, locales, localize, type Locale, type Localized } from "@/lib/i18n";
import { telHref } from "@/lib/links";

const section = getSection("services");

export function generateStaticParams() {
  return locales.flatMap((lang) => services.map((service) => ({ lang, slug: service.id })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!isLocale(lang) || !service) return {};
  return {
    title: `${localize(service.title, lang)} — Tabobat Markazi`,
    description: localize(service.description, lang),
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const service = getService(slug);
  if (!isLocale(lang) || !service) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  const index = services.indexOf(service);
  const address = `${section.number}.${index + 1}`;
  const [lead, ...rest] = service.images;
  const others = services.filter((other) => other.id !== service.id);

  // Leaflet paragraphs beyond the description, numbered in reading order; absent fields are left out.
  const paragraphs = (
    [
      [d.leaflet.indications, service.indications],
      [d.leaflet.contraindications, service.contraindications],
      [d.leaflet.preparation, service.preparation],
    ] as [Localized<string>, Localized<string> | undefined][]
  ).filter((entry): entry is [Localized<string>, Localized<string>] => Boolean(entry[1]));
  const missingSafetyFacts = !service.duration || !service.contraindications;

  return (
    <SiteShell lang={lang} current="services">
      <SectionBand
        as="h1"
        section={section}
        number={address}
        title={pick(service.title)}
        lede={pick(service.description)}
        crumb={
          <Link href={sectionHref(section, lang)} className="inline-flex items-center gap-2 no-underline hover:underline">
            <ArrowLeft aria-hidden className="size-4" strokeWidth={2.5} />
            <span className="tabular">{section.number}</span> {pick(section.title)}
          </Link>
        }
      >
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-6">
          {/* Plates */}
          <figure className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone">
              <Image
                src={lead}
                alt={pick(service.title)}
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            {rest.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 md:mt-6 md:gap-6">
                {rest.slice(0, 2).map((src) => (
                  <div
                    key={src}
                    className={`relative overflow-hidden bg-stone ${
                      rest.length === 1 ? "col-span-2 aspect-[2/1]" : "aspect-square"
                    }`}
                  >
                    <Image src={src} alt="" fill sizes="(min-width: 768px) 28vw, 45vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
            <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
          </figure>

          {/* The insert: spec table and the way to book */}
          <aside className="md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1">
            <div className="md:sticky md:top-20">
              <dl className="border-t-2 border-ink">
                <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-4">
                  <dt className="text-sm text-ink-2">{pick(d.priceFrom)}</dt>
                  <dd className="tabular text-3xl font-bold tracking-[-0.02em] md:text-4xl">
                    {pick(service.price)}
                  </dd>
                </div>
                {service.duration && (
                  <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-4">
                    <dt className="text-sm text-ink-2">{pick(d.leaflet.duration)}</dt>
                    <dd className="tabular text-xl font-bold">{pick(service.duration)}</dd>
                  </div>
                )}
                <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-4">
                  <dt className="text-sm text-ink-2">{pick(d.leaflet.booking)}</dt>
                  <dd className="text-xl font-bold">{pick(d.leaflet.byPhone)}</dd>
                </div>
              </dl>
              <CallButton lang={lang} className="mt-6 w-full" />
              <a
                href={telHref(contact.phones[1])}
                className="tabular mt-2 flex h-14 items-center justify-center border-2 border-ink font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {contact.phones[1]}
              </a>
              <a
                href={sectionHref(getSection("contacts"), lang)}
                className="mt-5 inline-flex items-start gap-2 font-bold"
              >
                <MapPin aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
                {pick(contact.address)}
              </a>
              {missingSafetyFacts && (
                <p className="mt-5 border-t-2 border-ink pt-3 text-sm leading-snug text-ink-2">
                  {pick(d.leaflet.askByPhone)}
                </p>
              )}
            </div>
          </aside>

          {/* Leaflet text */}
          {paragraphs.length > 0 && (
          <ol className="md:col-span-7">
            {paragraphs.map(([heading, body], i) => (
              <li key={heading.en} className="grid grid-cols-[2.75rem_1fr] gap-x-3 border-t-2 border-ink py-5">
                <span className="tabular pt-1 text-sm font-bold text-herb">{i + 1}</span>
                <div>
                  <h2 className="text-xl font-bold tracking-[-0.01em] md:text-2xl">{pick(heading)}</h2>
                  <p className="mt-2 max-w-[65ch] leading-relaxed text-ink-2 md:text-lg">{pick(body)}</p>
                </div>
              </li>
            ))}
          </ol>
          )}
        </div>

        {/* Other services in the range */}
        <nav aria-labelledby="other-services" className="mt-14 md:mt-24">
          <h2 id="other-services" className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            {pick(d.otherServices)}
          </h2>
          <ol className="mt-5 border-t-2 border-ink md:mt-8 md:grid md:grid-cols-3 md:gap-x-6 md:border-t-0">
            {others.map((other) => (
              <li key={other.id} className="md:border-t-2 md:border-ink">
                <Link
                  href={`/${lang}/${section.slug}/${other.id}`}
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-3 border-b-2 border-ink py-4 no-underline md:border-b-0 md:py-5"
                >
                  <span className="tabular text-sm font-bold text-herb">
                    {section.number}.{services.indexOf(other) + 1}
                  </span>
                  <span>
                    <span className="block text-lg leading-tight font-bold group-hover:underline md:text-xl">
                      {pick(other.title)}
                    </span>
                    <span className="tabular mt-1 block text-sm font-medium text-ink-2">{pick(other.price)}</span>
                  </span>
                  <ArrowRight
                    aria-hidden
                    className="size-5 self-center transition-transform duration-300 ease-out group-hover:translate-x-1"
                    strokeWidth={2.25}
                  />
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </SectionBand>
    </SiteShell>
  );
}
