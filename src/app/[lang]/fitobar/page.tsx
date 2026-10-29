import { MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { CallButton } from "@/components/CallButton";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { contact } from "@/data/contact";
import { products } from "@/data/products";
import { getSection, sectionHref } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, localize, type Locale, type Localized } from "@/lib/i18n";
import { telHref } from "@/lib/links";

const section = getSection("fitobar");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(section.title, lang)} — Tabobat Markazi`,
    description: localize(d.fitobarLede, lang),
  };
}

export default async function FitobarPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  return (
    <SiteShell lang={lang} current="fitobar">
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(d.fitobarLede)}>
        <figure className="mb-10 md:mb-16">
          <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/8]">
            <Image
              src="/images/concept/concept.jpg"
              alt={pick({
                uz: "Quritilgan o'tlar va dorivor yig'malar saqlanadigan xona",
                ru: "Комната с сушёными травами и лечебными сборами",
                en: "A room of dried herbs and medicinal blends",
              })}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
        </figure>

        {/* The shelf: every product with its address, terms and a way to order */}
        <ol className="grid gap-y-12 md:grid-cols-3 md:gap-x-6 md:gap-y-16">
          {products.map((product, index) => {
            const spec = (
              [
                [d.productSpec.size, product.size],
                [d.productSpec.ingredients, product.ingredients],
                [d.productSpec.usage, product.usage],
              ] as [Localized<string>, Localized<string> | undefined][]
            ).filter((row): row is [Localized<string>, Localized<string>] => Boolean(row[1]));

            return (
              <li key={product.id} id={product.id} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-square">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 grid flex-1 grid-cols-[2.75rem_1fr] border-t-2 border-ink pt-3">
                  <span className="tabular pt-1 text-sm font-bold text-on-saffron-2">
                    {section.number}.{index + 1}
                  </span>
                  <div className="flex flex-col">
                    <h2 className="text-2xl leading-tight font-bold tracking-[-0.02em]">{pick(product.title)}</h2>
                    <p className="mt-2 max-w-[48ch] leading-snug text-ink-2">{pick(product.description)}</p>
                    {spec.length > 0 && (
                      <dl className="mt-3 grid gap-1 text-sm">
                        {spec.map(([label, value]) => (
                          <div key={label.en} className="flex gap-2">
                            <dt className="text-ink-2">{pick(label)}:</dt>
                            <dd className="font-medium">{pick(value)}</dd>
                          </div>
                        ))}
                      </dl>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-4 pt-5">
                      <p className="tabular text-2xl font-bold">{pick(product.price)}</p>
                      <a
                        href={telHref(contact.phones[0])}
                        aria-label={`${pick(d.order)}: ${pick(product.title)}`}
                        className="inline-flex h-12 items-center gap-2 bg-saffron px-5 font-bold text-on-saffron no-underline transition-colors duration-200 hover:bg-saffron-bright"
                      >
                        <Phone aria-hidden className="size-4" strokeWidth={2.5} />
                        {pick(d.order)}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <p className="mt-8 text-xs text-ink-3">{pick(d.productsCaption)}</p>

        <div className="mt-12 grid gap-6 md:mt-20 md:grid-cols-12 md:gap-x-6">
          <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] md:col-span-5 md:text-5xl">
            {pick(d.howToOrder)}
          </h2>
          <div className="md:col-span-7">
            <p className="max-w-[52ch] text-lg leading-snug text-ink-2">{pick(d.orderText)}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <CallButton lang={lang} className="grow sm:grow-0" />
              <a
                href={telHref(contact.phones[1])}
                className="tabular inline-flex h-14 items-center border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
              >
                {contact.phones[1]}
              </a>
            </div>
            <a href={sectionHref(getSection("contacts"), lang)} className="mt-5 inline-flex items-start gap-2 font-bold">
              <MapPin aria-hidden className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
              {pick(contact.address)}
            </a>
          </div>
        </div>
      </SectionBand>
    </SiteShell>
  );
}
