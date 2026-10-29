import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { SweepLink } from "@/components/SweepLink";
import { contact } from "@/data/contact";
import { getSection, sectionHref } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, localize, type Locale } from "@/lib/i18n";
import { telHref } from "@/lib/links";
import { toneClass } from "@/lib/tone";

const section = getSection("contacts");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(section.title, lang)} — Tabobat Markazi`,
    description: `${localize(contact.address, lang)} · ${contact.phones.join(", ")}`,
  };
}

export default async function ContactsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const query = encodeURIComponent(contact.directionsQuery);

  const directions = [
    ["Google Maps", `https://www.google.com/maps/dir/?api=1&destination=${query}`],
    ["Yandex Maps", `https://yandex.uz/maps/?text=${query}`],
  ];
  const socials = [
    ["Telegram", contact.telegram],
    ["Instagram", contact.instagram],
    ["YouTube", contact.youtube],
  ];
  // Each common reason to get in touch, routed to the section that handles it.
  const routes = [
    { section: getSection("services"), label: d.servicesCta, href: sectionHref(getSection("services"), lang) },
    { section: getSection("education"), label: d.form.title, href: `${sectionHref(getSection("education"), lang)}#ariza` },
    { section: getSection("fitobar"), label: d.fitobarCta, href: sectionHref(getSection("fitobar"), lang) },
  ];

  // Each row shows its address (06.1…) from data-n, so the <dl> holds only dt/dd.
  const row =
    "grid grid-cols-[2.75rem_1fr] gap-x-3 border-b-2 border-ink py-5 before:row-span-4 before:pt-1 before:text-sm before:font-bold before:text-on-stone-2 before:tabular-nums before:content-[attr(data-n)]";

  return (
    <SiteShell lang={lang} current="contacts">
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(d.contactsLede)}>
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-6">
          <dl className="border-t-2 border-ink md:col-span-5">
            <div className={row} data-n={`${section.number}.1`}>
                <dt className="col-start-2 text-sm text-ink-2">{pick(d.address)}</dt>
                <dd className="col-start-2 mt-1 text-2xl leading-tight font-bold tracking-[-0.02em] md:text-3xl">
                  {pick(contact.address)}
                </dd>
                <dd className="col-start-2 mt-4 flex flex-wrap gap-2">
                  {directions.map(([label, url]) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-12 items-center gap-2 border-2 border-ink px-4 text-sm font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
                    >
                      <MapPin aria-hidden className="size-4" strokeWidth={2.5} />
                      {label}
                      <span className="sr-only">: {pick(d.directions)}</span>
                    </a>
                  ))}
                </dd>
            </div>

            <div className={row} data-n={`${section.number}.2`}>
                <dt className="col-start-2 text-sm text-ink-2">{pick(d.phones)}</dt>
                {contact.phones.map((phone) => (
                  <dd key={phone} className="col-start-2 mt-1">
                    <a
                      href={telHref(phone)}
                      className="tabular inline-flex items-center gap-3 text-2xl font-bold no-underline hover:underline md:text-3xl"
                    >
                      <Phone aria-hidden className="size-5 text-herb" strokeWidth={2.5} />
                      {phone}
                    </a>
                  </dd>
                ))}
            </div>

            <div className={row} data-n={`${section.number}.3`}>
                <dt className="col-start-2 text-sm text-ink-2">{pick(d.hours)}</dt>
                <dd className={`col-start-2 mt-1 ${contact.hours ? "text-xl font-bold" : "text-ink-2"}`}>
                  {contact.hours ? pick(contact.hours) : pick(d.askHours)}
                </dd>
            </div>

            <div className={row} data-n={`${section.number}.4`}>
                <dt className="col-start-2 text-sm text-ink-2">{pick(d.social)}</dt>
                <dd className="col-start-2 mt-1 flex flex-wrap gap-x-5 gap-y-1 text-xl font-bold">
                  {socials.map(([label, url]) => (
                    <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      {label}
                      <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.5} />
                    </a>
                  ))}
                </dd>
            </div>
          </dl>

          <div className="relative aspect-[4/5] border-2 border-ink bg-stone sm:aspect-[4/3] md:col-span-7 md:aspect-auto md:min-h-[36rem]">
            <iframe
              src={contact.mapSrc}
              title={pick(d.mapTitle)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full"
            />
          </div>
        </div>

        <nav aria-labelledby="quick-links" className="mt-14 md:mt-24">
          <h2 id="quick-links" className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            {pick(d.quickLinks)}
          </h2>
          <ol className="mt-6 grid border-y-2 border-ink md:mt-8 md:grid-cols-3">
            {routes.map(({ section: target, label, href }) => {
              const tone = toneClass[target.tone];
              return (
                <li key={target.id} className="border-b-2 border-ink last:border-b-0 md:border-r-2 md:border-b-0 md:last:border-r-0">
                  <SweepLink
                    href={href}
                    tone={target.tone}
                    number={target.number}
                    title={pick(target.title)}
                    className={`group flex min-h-24 flex-col items-start justify-between gap-3 px-4 py-4 no-underline md:min-h-36 md:px-5 ${tone.bg} ${tone.fg}`}
                  >
                    <span className={`tabular text-sm font-bold ${tone.fg2}`}>
                      {target.number} {pick(target.title)}
                    </span>
                    <span className="flex items-center gap-2 text-xl font-bold md:text-2xl">
                      {pick(label)}
                      <ArrowRight
                        aria-hidden
                        className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1"
                        strokeWidth={2.5}
                      />
                    </span>
                  </SweepLink>
                </li>
              );
            })}
          </ol>
        </nav>
      </SectionBand>
    </SiteShell>
  );
}
