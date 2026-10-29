import { ArrowRight, ArrowUpRight, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { RangeStrip } from "@/components/RangeStrip";
import { SectionBand } from "@/components/SectionBand";
import { CallButton } from "@/components/CallButton";
import { SiteShell } from "@/components/SiteShell";
import { contact } from "@/data/contact";
import { courses } from "@/data/courses";
import { latestNews, news } from "@/data/news";
import { products } from "@/data/products";
import { sectionHref, sections } from "@/data/sections";
import { services } from "@/data/services";
import { tabibs } from "@/data/tabibs";
import { dictionary as d } from "@/i18n/dictionary";
import { cheapest, formatDate, leadingNumber } from "@/lib/format";
import { isLocale, localize, type Locale } from "@/lib/i18n";
import { telHref } from "@/lib/links";

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  const s = Object.fromEntries(sections.map((section) => [section.id, section])) as Record<
    (typeof sections)[number]["id"],
    (typeof sections)[number]
  >;

  const lowestService = cheapest(services, (service) => service.price.uz);
  const weeks = courses.map((course) => leadingNumber(course.duration.uz));
  const weekUnit = pick({ uz: "hafta", ru: "нед.", en: "weeks" });
  const courseSpan = `${Math.min(...weeks)}–${Math.max(...weeks)} ${weekUnit}`;

  const rangeItems = [
    { section: s.services, fact: pick(d.rangeFacts.services)(services.length, pick(lowestService.price)) },
    { section: s.news, fact: pick(d.rangeFacts.news)(news.length) },
    { section: s.tabibs, fact: pick(d.rangeFacts.tabibs)(tabibs.length) },
    { section: s.fitobar, fact: pick(d.rangeFacts.fitobar)(products.length) },
    { section: s.education, fact: pick(d.rangeFacts.education)(courses.length, courseSpan) },
    { section: s.contacts, fact: "Farobiy 2" },
  ].map((item) => ({ ...item, title: pick(item.section.title), href: sectionHref(item.section, lang) }));

  const [leadArticle, ...moreArticles] = latestNews();

  return (
    <SiteShell lang={lang}>
        {/* 00 — the carton front */}
        <section data-section="home" aria-labelledby="hero-title" className="overflow-hidden">
          <div className="mx-auto max-w-[1600px]">
            <p
              aria-hidden
              className="-ml-[0.04em] pt-4 text-[23vw] leading-[0.8] font-black tracking-[-0.04em] whitespace-nowrap md:pt-6 md:pl-8 md:text-[min(20.5vw,20rem)]"
            >
              {pick(d.wordmark)}
            </p>
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink px-4 py-2.5 text-xs font-bold tracking-[0.06em] uppercase md:px-10 md:text-sm">
              <span className="text-balance">{pick(d.officialName)}</span>
              <span className="shrink-0">Toshkent · Farobiy 2</span>
            </div>

            <div className="grid gap-y-5 px-4 pt-4 pb-6 md:grid-cols-12 md:gap-x-6 md:px-10 md:pt-8 md:pb-8">
              <figure className="md:col-span-7 md:col-start-6 md:row-span-2">
                <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/9]">
                  <Image
                    src="/images/concept/closing-bg.jpg"
                    alt={pick({
                      uz: "Yorug' dam olish va muolaja xonasi",
                      ru: "Светлая комната для отдыха и процедур",
                      en: "A calm, light room for rest and treatment",
                    })}
                    fill
                    priority
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-ink-3">{pick(d.heroCaption)}</figcaption>
              </figure>

              <div className="md:col-span-5 md:row-start-1 md:flex md:flex-col md:justify-between">
                <h1
                  id="hero-title"
                  className="text-[2rem] leading-[1.02] font-bold tracking-[-0.03em] md:text-[clamp(2.5rem,4vw,4.25rem)]"
                >
                  {pick(d.headline)}
                </h1>
                <p className="mt-3 max-w-[40ch] text-base leading-snug text-ink-2 md:mt-6 md:text-lg">
                  {pick(d.lede)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2 md:mt-8">
                  <CallButton lang={lang} className="grow md:grow-0" />
                  <Link
                    href={sectionHref(s.education, lang)}
                    className="inline-flex h-14 items-center justify-center border-2 border-ink px-6 text-base font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
                  >
                    {pick(d.courses)}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <RangeStrip items={rangeItems} label={pick(d.menu)} />
        </section>

        {/* 01 — Xizmatlar */}
        <SectionBand section={s.services} title={pick(s.services.title)} lede={pick(d.servicesLede)}>
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
            <figure className="md:col-span-5">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone md:sticky md:top-20 md:aspect-[4/5]">
                <Image
                  src="/images/concept/zone6-herbs.jpg"
                  alt={pick({
                    uz: "Dorivor o'simliklar va yig'malar javoni",
                    ru: "Шкаф с лекарственными растениями и сборами",
                    en: "A cabinet of medicinal plants and blends",
                  })}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
            </figure>

            <div className="md:col-span-7">
              <ol className="border-t-2 border-ink">
                {services.map((service, index) => (
                  <li
                    key={service.id}
                    className="group relative grid grid-cols-[2.75rem_1fr] gap-x-3 gap-y-2 border-b-2 border-ink py-4 md:grid-cols-[3.5rem_1fr_auto] md:gap-x-6 md:py-6"
                  >
                    <span className="tabular pt-1.5 text-sm font-bold text-herb md:pt-2">
                      {s.services.number}.{index + 1}
                    </span>
                    <div>
                      <h3 className="text-xl leading-tight font-bold tracking-[-0.02em] md:text-2xl">
                        <Link
                          href={`/${lang}/${s.services.slug}/${service.id}`}
                          className="no-underline after:absolute after:inset-0 group-hover:underline"
                        >
                          {pick(service.title)}
                        </Link>
                      </h3>
                      <p className="mt-1.5 max-w-[60ch] text-sm leading-snug text-ink-2 md:text-base">
                        {pick(service.description)}
                      </p>
                    </div>
                    <p className="tabular col-start-2 text-lg font-bold md:col-start-3 md:pt-0.5 md:text-right md:text-2xl">
                      {pick(service.price)}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={telHref(contact.phones[0])}
                  className="inline-flex h-14 items-center gap-3 bg-herb px-6 font-bold text-on-herb no-underline transition-colors duration-200 hover:bg-herb-deep"
                >
                  <Phone aria-hidden className="size-5" strokeWidth={2.25} />
                  {pick(d.servicesCta)}
                </a>
                <Link
                  href={sectionHref(s.services, lang)}
                  className="group inline-flex h-14 items-center gap-2 border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  {pick(d.allServices)}
                  <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* 02 — Yangiliklar */}
        <SectionBand section={s.news} title={pick(s.news.title)} lede={pick(d.newsLede)}>
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
            <article className="group relative grid gap-x-6 md:col-span-12 md:grid-cols-12">
              <figure className="md:col-span-7">
                <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[2/1]">
                  <Image
                    src={leadArticle.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
              </figure>
              <div className="mt-4 md:col-span-5 md:mt-0 md:flex md:flex-col md:border-t-2 md:border-ink md:pt-4 md:pb-7">
                <h3 className="text-2xl leading-tight font-bold tracking-[-0.02em] md:text-4xl">
                  <Link
                    href={`${sectionHref(s.news, lang)}/${leadArticle.slug}`}
                    className="no-underline after:absolute after:inset-0 group-hover:underline"
                  >
                    {pick(leadArticle.title)}
                  </Link>
                </h3>
                <time dateTime={leadArticle.date} className="tabular mt-2 block text-sm font-medium text-ink-2">
                  {formatDate(leadArticle.date, lang)}
                </time>
                <p className="mt-3 max-w-[65ch] leading-snug text-ink-2 md:mt-auto md:text-lg">
                  {pick(leadArticle.description)}
                </p>
              </div>
            </article>

            <ol className="grid border-t-2 border-ink md:col-span-12 md:grid-cols-2 md:gap-x-6">
              {moreArticles.map((article) => (
                <li key={article.slug} className="group relative border-b-2 border-ink py-4 md:py-6">
                  <h3 className="text-lg leading-tight font-bold tracking-[-0.01em] md:text-2xl">
                    <Link
                      href={`${sectionHref(s.news, lang)}/${article.slug}`}
                      className="no-underline after:absolute after:inset-0 group-hover:underline"
                    >
                      {pick(article.title)}
                    </Link>
                  </h3>
                  <time dateTime={article.date} className="tabular mt-1.5 block text-sm font-medium text-ink-2">
                    {formatDate(article.date, lang)}
                  </time>
                </li>
              ))}
            </ol>
          </div>
          <Link
            href={sectionHref(s.news, lang)}
            className="group mt-8 inline-flex h-14 items-center gap-2 border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            {pick(d.allNews)}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </SectionBand>

        {/* 03 — Tabiblar */}
        <SectionBand section={s.tabibs} title={pick(s.tabibs.title)} lede={pick(d.tabibsLede)}>
          <ol className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {tabibs.map((tabib, index) => (
              <li key={tabib.id} className="group relative w-[78%] shrink-0 snap-start md:w-auto">
                <div className="relative aspect-[4/5] overflow-hidden bg-stone">
                  <Image
                    src={tabib.image}
                    alt={pick(tabib.name)}
                    fill
                    sizes="(min-width: 768px) 30vw, 78vw"
                    className="object-cover"
                  />
                  {tabib.mock && (
                    <span className="absolute top-0 left-0 bg-pomegranate px-2.5 py-1 text-xs font-bold text-on-pomegranate">
                      {pick(d.mockLabel)}
                    </span>
                  )}
                </div>
                <div className="mt-3 grid grid-cols-[2.75rem_1fr] border-t-2 border-ink pt-3">
                  <span className="tabular pt-1 text-sm font-bold text-pomegranate">
                    {s.tabibs.number}.{index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl leading-tight font-bold tracking-[-0.02em] md:text-2xl">
                      <Link
                        href={`${sectionHref(s.tabibs, lang)}/${tabib.id}`}
                        className="no-underline after:absolute after:inset-0 group-hover:underline"
                      >
                        {pick(tabib.name)}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm font-medium text-ink-2">{pick(tabib.role)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <Link
            href={sectionHref(s.tabibs, lang)}
            className="group mt-8 inline-flex h-14 items-center gap-2 border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            {pick(d.allTabibs)}
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </SectionBand>

        {/* 04 — Fitobar */}
        <SectionBand section={s.fitobar} title={pick(s.fitobar.title)} lede={pick(d.fitobarLede)}>
          <figure className="mb-8 md:mb-12">
            <div className="relative aspect-[16/9] overflow-hidden bg-stone md:aspect-[21/8]">
              <Image
                src="/images/concept/concept.jpg"
                alt={pick({
                  uz: "Quritilgan o'tlar va dorivor yig'malar saqlanadigan xona",
                  ru: "Комната с сушёными травами и лечебными сборами",
                  en: "A room of dried herbs and medicinal blends",
                })}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
          </figure>
          <ol className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
            {products.map((product, index) => (
              <li key={product.id} className="group relative">
                <div className="relative aspect-square overflow-hidden bg-stone">
                  <Image
                    src={product.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 30vw, 45vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-3 grid grid-cols-[2.5rem_1fr] border-t-2 border-ink pt-2.5 md:grid-cols-[3rem_1fr]">
                  <span className="tabular pt-0.5 text-xs font-bold text-on-saffron-2 md:pt-1 md:text-sm">
                    {s.fitobar.number}.{index + 1}
                  </span>
                  <div>
                    <h3 className="text-base leading-tight font-bold md:text-xl">
                      <Link
                        href={`${sectionHref(s.fitobar, lang)}#${product.id}`}
                        className="no-underline after:absolute after:inset-0 group-hover:underline"
                      >
                        {pick(product.title)}
                      </Link>
                    </h3>
                    <p className="mt-1 hidden max-w-[50ch] text-sm leading-snug text-ink-2 md:block">
                      {pick(product.description)}
                    </p>
                    <p className="tabular mt-1.5 font-bold md:text-lg">{pick(product.price)}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-xs text-ink-3">{pick(d.productsCaption)}</p>
          <div className="mt-10 flex flex-wrap gap-2">
            <a
              href={telHref(contact.phones[0])}
              className="inline-flex h-14 items-center gap-3 bg-saffron px-6 font-bold text-on-saffron no-underline transition-colors duration-200 hover:bg-saffron-bright"
            >
              <Phone aria-hidden className="size-5" strokeWidth={2.25} />
              {pick(d.fitobarCta)}
            </a>
            <Link
              href={sectionHref(s.fitobar, lang)}
              className="group inline-flex h-14 items-center gap-2 border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
            >
              {pick(d.allProducts)}
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
          </div>
        </SectionBand>

        {/* 05 — Ta'lim */}
        <SectionBand section={s.education} title={pick(s.education.title)} lede={pick(d.educationLede)}>
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
            <figure className="md:col-span-4">
              <div className="relative aspect-[4/3] overflow-hidden bg-stone md:aspect-[3/4]">
                <Image
                  src="/images/concept/zone4-lab.jpg"
                  alt={pick({
                    uz: "Dorivor o'simliklar bilan ishlash uchun laboratoriya",
                    ru: "Лаборатория для работы с лекарственными растениями",
                    en: "A laboratory for working with medicinal plants",
                  })}
                  fill
                  sizes="(min-width: 768px) 32vw, 100vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
            </figure>

            <div className="md:col-span-8">
              <table className="w-full border-collapse text-left">
                <thead className="hidden md:table-header-group">
                  <tr className="border-b-2 border-ink text-sm text-ink-2">
                    <th scope="col" className="w-14 py-2 font-medium">№</th>
                    <th scope="col" className="py-2 pr-4 font-medium">{pick(d.table.course)}</th>
                    <th scope="col" className="py-2 pr-4 font-medium">{pick(d.table.duration)}</th>
                    <th scope="col" className="py-2 text-right font-medium">{pick(d.table.price)}</th>
                  </tr>
                </thead>
                <tbody className="border-t-2 border-ink md:border-t-0">
                  {courses.map((course, index) => (
                    <tr
                      key={course.id}
                      className="grid grid-cols-[2.75rem_1fr_auto] gap-x-3 border-b-2 border-ink py-4 align-top md:table-row md:py-0"
                    >
                      <td className="tabular row-span-3 pt-1 text-xs font-bold text-cobalt md:py-5 md:pt-6 md:align-top">
                        {s.education.number}.{index + 1}
                      </td>
                      <td className="col-span-2 md:py-5 md:pr-4 md:align-top">
                        <Link
                          href={`/${lang}/${s.education.slug}/${course.id}`}
                          className="text-lg leading-tight font-bold tracking-[-0.01em] no-underline hover:underline md:text-xl"
                        >
                          {pick(course.title)}
                        </Link>
                        <p className="mt-1 text-sm leading-snug text-ink-2">
                          <span className="font-medium text-ink">{pick(d.table.requirements)}:</span>{" "}
                          {pick(course.requirements)}
                        </p>
                      </td>
                      <td className="tabular mt-2 text-sm font-medium md:mt-0 md:py-5 md:pr-4 md:align-top md:text-base">
                        {pick(course.duration)}
                      </td>
                      <td className="tabular mt-2 text-right font-bold md:mt-0 md:py-5 md:align-top md:text-lg">
                        {pick(course.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  href={`${sectionHref(s.education, lang)}#ariza`}
                  className="group inline-flex h-14 items-center gap-3 bg-cobalt px-6 font-bold text-on-cobalt no-underline transition-colors duration-200 hover:bg-cobalt-deep"
                >
                  {pick(d.form.title)}
                  <ArrowRight aria-hidden className="size-5 transition-transform duration-300 ease-out group-hover:translate-x-1" strokeWidth={2.25} />
                </Link>
                <Link
                  href={sectionHref(s.education, lang)}
                  className="inline-flex h-14 items-center border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
                >
                  {pick(d.allCourses)}
                </Link>
              </div>
            </div>
          </div>
        </SectionBand>

        {/* 06 — Kontaktlar */}
        <SectionBand section={s.contacts} title={pick(s.contacts.title)} lede={pick(d.contactsLede)}>
          <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
            <dl className="grid content-start gap-6 md:col-span-5">
              <div className="border-t-2 border-ink pt-3">
                <dt className="text-sm text-ink-2">{pick(d.address)}</dt>
                <dd className="mt-1 flex items-start gap-2 text-xl font-bold md:text-2xl">
                  <MapPin aria-hidden className="mt-1 size-5 shrink-0" strokeWidth={2.25} />
                  {pick(contact.address)}
                </dd>
              </div>
              <div className="border-t-2 border-ink pt-3">
                <dt className="text-sm text-ink-2">{pick(d.phones)}</dt>
                {contact.phones.map((phone) => (
                  <dd key={phone} className="mt-1">
                    <a href={telHref(phone)} className="tabular text-xl font-bold md:text-2xl">
                      {phone}
                    </a>
                  </dd>
                ))}
              </div>
              <div className="border-t-2 border-ink pt-3">
                <dt className="text-sm text-ink-2">{pick(d.social)}</dt>
                <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-lg font-bold">
                  {[
                    ["Telegram", contact.telegram],
                    ["Instagram", contact.instagram],
                    ["YouTube", contact.youtube],
                  ].map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1">
                      {label}
                      <ArrowUpRight aria-hidden className="size-4" strokeWidth={2.5} />
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
            <div className="relative aspect-[4/3] border-2 border-ink bg-stone md:col-span-7 md:aspect-auto md:min-h-[26rem]">
              <iframe
                src={contact.mapSrc}
                title={pick(d.mapTitle)}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full"
              />
            </div>
          </div>
        </SectionBand>
    </SiteShell>
  );
}
