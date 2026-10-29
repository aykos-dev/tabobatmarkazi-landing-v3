import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { contact } from "@/data/contact";
import { latestNews } from "@/data/news";
import { getSection } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { formatDate } from "@/lib/format";
import { isLocale, localize, type Locale } from "@/lib/i18n";

const section = getSection("news");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(section.title, lang)} — Tabobat Markazi`,
    description: localize(d.newsLede, lang),
  };
}

export default async function NewsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const [lead, ...rest] = latestNews();
  const href = (slug: string) => `/${lang}/${section.slug}/${slug}`;

  return (
    <SiteShell lang={lang} current="news">
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(d.newsLede)}>
        {!lead ? (
          <div className="border-t-2 border-ink pt-6">
            <h2 className="text-3xl font-bold tracking-[-0.02em]">{pick(d.emptyNews.title)}</h2>
            <p className="mt-2 max-w-[48ch] text-lg text-ink-2">{pick(d.emptyNews.text)}</p>
            <div className="mt-4 flex gap-5 text-lg font-bold">
              {[
                ["Telegram", contact.telegram],
                ["Instagram", contact.instagram],
              ].map(([label, url]) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                  {label}
                  <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.5} />
                </a>
              ))}
            </div>
          </div>
        ) : (
          <>
            {/* The latest story leads */}
            <article className="group relative grid gap-x-6 md:grid-cols-12">
              <figure className="md:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[2/1]">
                  <Image
                    src={lead.image}
                    alt=""
                    fill
                    priority
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
              </figure>
              <div className="mt-4 md:col-span-5 md:mt-0 md:flex md:flex-col md:border-t-2 md:border-ink md:pt-4 md:pb-7">
                <h2 className="text-3xl leading-tight font-bold tracking-[-0.02em] md:text-5xl">
                  <Link href={href(lead.slug)} className="no-underline after:absolute after:inset-0 group-hover:underline">
                    {pick(lead.title)}
                  </Link>
                </h2>
                <time dateTime={lead.date} className="tabular mt-2 block text-sm font-medium text-ink-2">
                  {formatDate(lead.date, lang)}
                </time>
                <p className="mt-3 max-w-[60ch] leading-snug text-ink-2 md:mt-auto md:text-lg">
                  {pick(lead.description)}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  {pick(d.readArticle)}
                  <ArrowRight
                    aria-hidden
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                    strokeWidth={2.5}
                  />
                </span>
              </div>
            </article>

            {rest.length > 0 && (
              <ol className="mt-12 border-t-2 border-ink md:mt-20">
                {rest.map((article) => (
                  <li
                    key={article.slug}
                    className="group relative grid gap-x-6 gap-y-3 border-b-2 border-ink py-6 md:grid-cols-12 md:py-8"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-stone md:order-last md:col-span-3 md:aspect-[4/3]">
                      <Image
                        src={article.image}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 22vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <time dateTime={article.date} className="tabular text-sm font-medium text-ink-2 md:col-span-2 md:pt-2">
                      {formatDate(article.date, lang)}
                    </time>
                    <div className="md:col-span-7">
                      <h2 className="text-2xl leading-tight font-bold tracking-[-0.02em] md:text-4xl">
                        <Link
                          href={href(article.slug)}
                          className="no-underline after:absolute after:inset-0 group-hover:underline"
                        >
                          {pick(article.title)}
                        </Link>
                      </h2>
                      <p className="mt-2 max-w-[60ch] leading-snug text-ink-2 md:mt-3 md:text-lg">
                        {pick(article.description)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </>
        )}
      </SectionBand>
    </SiteShell>
  );
}
