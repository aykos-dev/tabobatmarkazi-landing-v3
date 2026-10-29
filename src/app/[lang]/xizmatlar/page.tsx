import { ArrowRight, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CallButton } from "@/components/CallButton";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { contact } from "@/data/contact";
import { getSection, sectionHref } from "@/data/sections";
import { services } from "@/data/services";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, localize, type Locale } from "@/lib/i18n";
import { telHref } from "@/lib/links";

const section = getSection("services");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(section.title, lang)} — Tabobat Markazi`,
    description: localize(d.servicesLede, lang),
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  return (
    <SiteShell lang={lang} current="services">
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(d.servicesLede)}>
        <figure className="mb-10 md:mb-16">
          <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/8]">
            <Image
              src="/images/concept/zone1-house.jpg"
              alt={pick({
                uz: "Yorug' qabul zali va dam olish joyi",
                ru: "Светлый приёмный зал с местами для отдыха",
                en: "A light reception hall with places to rest",
              })}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
        </figure>

        <ol className="border-t-2 border-ink">
          {services.map((service, index) => {
            const href = `/${lang}/${section.slug}/${service.id}`;
            return (
              <li
                key={service.id}
                className="group relative grid grid-cols-[2.75rem_1fr] gap-x-3 border-b-2 border-ink py-5 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-6 md:py-8"
              >
                <div className="relative col-span-2 mb-4 aspect-[16/10] overflow-hidden bg-stone md:col-span-4 md:col-start-9 md:row-span-2 md:row-start-1 md:mb-0 md:aspect-[3/2]">
                  <Image
                    src={service.images[0]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <span className="tabular pt-1.5 text-sm font-bold text-herb md:col-span-1 md:row-start-1 md:pt-2.5 md:text-base">
                  {section.number}.{index + 1}
                </span>
                <div className="md:col-span-5 md:row-start-1">
                  <h2 className="text-2xl leading-tight font-bold tracking-[-0.02em] md:text-4xl">
                    <Link
                      href={href}
                      className="no-underline after:absolute after:inset-0 group-hover:underline"
                    >
                      {pick(service.title)}
                    </Link>
                  </h2>
                  <p className="mt-2 max-w-[52ch] leading-snug text-ink-2 md:mt-3 md:text-lg">
                    {pick(service.description)}
                  </p>
                </div>
                <p className="tabular col-start-2 mt-3 text-xl font-bold md:col-span-2 md:col-start-7 md:row-span-2 md:row-start-1 md:mt-0 md:pt-1 md:text-right md:text-2xl">
                  {pick(service.price)}
                </p>
                <span className="col-start-2 mt-3 inline-flex items-center gap-2 self-end text-sm font-bold text-herb md:col-span-5 md:col-start-2 md:row-start-2 md:mt-4">
                  {pick(d.details)}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-12 grid gap-6 md:mt-20 md:grid-cols-12 md:gap-x-6">
          <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] md:col-span-5 md:text-5xl">
            {pick(d.leaflet.howToBook)}
          </h2>
          <div className="md:col-span-7">
            <p className="max-w-[52ch] text-lg leading-snug text-ink-2">{pick(d.leaflet.bookingText)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <CallButton lang={lang} className="grow sm:grow-0" />
              <a
                href={telHref(contact.phones[1])}
                className="tabular inline-flex h-14 items-center border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {contact.phones[1]}
              </a>
            </div>
            <a
              href={sectionHref(getSection("contacts"), lang)}
              className="mt-5 inline-flex items-start gap-2 font-bold"
            >
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
              {pick(contact.address)}
            </a>
          </div>
        </div>
      </SectionBand>
    </SiteShell>
  );
}
