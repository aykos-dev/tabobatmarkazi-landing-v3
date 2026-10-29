import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteShell } from "@/components/SiteShell";
import { getArticle, latestNews, news } from "@/data/news";
import { getSection, sectionHref } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { formatDate } from "@/lib/format";
import { isLocale, locales, localize, type Locale } from "@/lib/i18n";

const section = getSection("news");

export function generateStaticParams() {
  return locales.flatMap((lang) => news.map((article) => ({ lang, slug: article.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(lang) || !article) return {};
  return {
    title: `${localize(article.title, lang)} — Tabobat Markazi`,
    description: localize(article.description, lang),
    openGraph: { type: "article", publishedTime: article.date, images: [article.image] },
  };
}

/** A news story set for reading: one measure, one image, the rest of the news after it. */
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!isLocale(lang) || !article) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const others = latestNews().filter((other) => other.slug !== article.slug);

  return (
    <SiteShell lang={lang} current="news">
      <article data-section="news" aria-labelledby="article-title">
        <header className="bg-ink text-on-ink">
          <div className="mx-auto max-w-[1600px] px-4 pt-4 pb-8 md:px-10 md:pt-6 md:pb-14">
            <Link
              href={sectionHref(section, lang)}
              className="inline-flex items-center gap-2 text-sm font-bold text-on-ink-2 no-underline hover:underline"
            >
              <ArrowLeft aria-hidden className="size-4" strokeWidth={2.5} />
              <span className="tabular">{section.number}</span> {pick(section.title)}
            </Link>
            <div className="mt-8 md:mt-14 md:grid md:grid-cols-12 md:gap-x-6">
              <time
                dateTime={article.date}
                className="tabular block text-sm font-bold text-on-ink-2 md:col-span-3 md:pt-3 md:text-base"
              >
                {formatDate(article.date, lang)}
              </time>
              <div className="mt-3 md:col-span-8 md:mt-0">
                <h1
                  id="article-title"
                  className="text-4xl leading-[1.02] font-bold tracking-[-0.03em] md:text-7xl"
                >
                  {pick(article.title)}
                </h1>
                <p className="mt-4 max-w-[52ch] text-lg leading-snug text-on-ink-2 md:mt-6 md:text-2xl">
                  {pick(article.description)}
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-8 md:px-10 md:py-14">
          <figure className="md:grid md:grid-cols-12 md:gap-x-6">
            <div className="relative aspect-[16/10] overflow-hidden bg-stone md:col-span-9 md:col-start-4 md:aspect-[2/1]">
              <Image
                src={article.image}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 72vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-ink-3 md:col-span-9 md:col-start-4">
              {pick(d.conceptCaption)}
            </figcaption>
          </figure>

          <div className="mt-8 md:mt-14 md:grid md:grid-cols-12 md:gap-x-6">
            <div className="max-w-[65ch] space-y-5 text-lg leading-relaxed md:col-span-7 md:col-start-4 md:text-xl md:leading-relaxed">
              {pick(article.body).map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <nav aria-labelledby="more-news" className="mx-auto max-w-[1600px] px-4 pb-14 md:px-10 md:pb-24">
          <h2 id="more-news" className="border-t-2 border-ink pt-6 text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            {pick(d.otherNews)}
          </h2>
          <ol className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug} className="group relative grid grid-cols-[1fr_6.5rem] gap-4 md:grid-cols-[1fr_11rem]">
                <div>
                  <h3 className="text-lg leading-tight font-bold md:text-2xl">
                    <Link
                      href={`/${lang}/${section.slug}/${other.slug}`}
                      className="no-underline after:absolute after:inset-0 group-hover:underline"
                    >
                      {pick(other.title)}
                    </Link>
                  </h3>
                  <time dateTime={other.date} className="tabular mt-2 block text-sm font-medium text-ink-2">
                    {formatDate(other.date, lang)}
                  </time>
                  <span className="mt-3 hidden items-center gap-2 text-sm font-bold md:inline-flex">
                    {pick(d.readArticle)}
                    <ArrowRight
                      aria-hidden
                      className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </span>
                </div>
                <div className="relative aspect-square overflow-hidden bg-stone">
                  <Image src={other.image} alt="" fill sizes="11rem" className="object-cover" />
                </div>
              </li>
            ))}
          </ol>
        </nav>
      )}
    </SiteShell>
  );
}
