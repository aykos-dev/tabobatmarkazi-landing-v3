import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyForm } from "@/components/ApplyForm";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { courses, getCourse } from "@/data/courses";
import { getSection, sectionHref } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, locales, localize, type Locale, type Localized } from "@/lib/i18n";

const section = getSection("education");

export function generateStaticParams() {
  return locales.flatMap((lang) => courses.map((course) => ({ lang, slug: course.id })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const course = getCourse(slug);
  if (!isLocale(lang) || !course) return {};
  return {
    title: `${localize(course.title, lang)} — Tabobat Markazi`,
    description: localize(course.description, lang),
  };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const course = getCourse(slug);
  if (!isLocale(lang) || !course) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  const index = courses.indexOf(course);
  const others = courses.filter((other) => other.id !== course.id);

  // The spec table: always duration and price, then whatever the centre has supplied.
  const spec = (
    [
      [d.table.duration, course.duration],
      [d.courseSpec.start, course.start],
      [d.courseSpec.schedule, course.schedule],
      [d.courseSpec.certificate, course.certificate],
    ] as [Localized<string>, Localized<string> | undefined][]
  ).filter((row): row is [Localized<string>, Localized<string>] => Boolean(row[1]));

  return (
    <SiteShell lang={lang} current="education">
      <SectionBand
        as="h1"
        section={section}
        number={`${section.number}.${index + 1}`}
        title={pick(course.title)}
        lede={pick(course.description)}
        crumb={
          <Link href={sectionHref(section, lang)} className="inline-flex items-center gap-2 no-underline hover:underline">
            <ArrowLeft aria-hidden className="size-4" strokeWidth={2.5} />
            <span className="tabular">{section.number}</span> {pick(section.title)}
          </Link>
        }
      >
        <div className="grid gap-10 md:grid-cols-12 md:gap-x-6">
          <figure className="md:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone">
              <Image
                src={course.image}
                alt=""
                fill
                priority
                sizes="(min-width: 768px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
          </figure>

          <aside className="md:col-span-5">
            <dl className="border-t-2 border-ink">
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-4">
                <dt className="text-sm text-ink-2">{pick(d.table.price)}</dt>
                <dd className="tabular text-3xl font-bold tracking-[-0.02em] md:text-4xl">{pick(course.price)}</dd>
              </div>
              {spec.map(([label, value]) => (
                <div key={label.en} className="flex items-baseline justify-between gap-4 border-b-2 border-ink py-4">
                  <dt className="text-sm text-ink-2">{pick(label)}</dt>
                  <dd className="tabular text-right text-xl font-bold">{pick(value)}</dd>
                </div>
              ))}
              <div className="border-b-2 border-ink py-4">
                <dt className="text-sm text-ink-2">{pick(d.table.requirements)}</dt>
                <dd className="mt-1 text-lg leading-snug font-bold">{pick(course.requirements)}</dd>
              </div>
            </dl>
            {!course.start && (
              <p className="mt-4 text-sm leading-snug text-ink-2">{pick(d.courseSpec.askStart)}</p>
            )}
            <a
              href="#ariza"
              className="mt-6 flex h-14 items-center justify-center gap-3 bg-cobalt px-6 font-bold text-on-cobalt no-underline transition-colors duration-200 hover:bg-cobalt-deep"
            >
              {pick(d.form.title)}
              <ArrowRight aria-hidden className="size-5" strokeWidth={2.25} />
            </a>
          </aside>
        </div>

        <div className="mt-14 grid md:mt-24 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <ApplyForm
              lang={lang}
              defaultCourse={course.id}
              courses={courses.map((option) => ({ id: option.id, label: pick(option.title) }))}
            />
          </div>
        </div>

        <nav aria-labelledby="other-courses" className="mt-14 md:mt-24">
          <h2 id="other-courses" className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
            {pick(d.otherCourses)}
          </h2>
          <ol className="mt-5 border-t-2 border-ink md:mt-8 md:grid md:grid-cols-3 md:gap-x-6 md:border-t-0">
            {others.map((other) => (
              <li key={other.id} className="md:border-t-2 md:border-ink">
                <Link
                  href={`/${lang}/${section.slug}/${other.id}`}
                  className="group grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-3 border-b-2 border-ink py-4 no-underline md:border-b-0 md:py-5"
                >
                  <span className="tabular text-sm font-bold text-cobalt">
                    {section.number}.{courses.indexOf(other) + 1}
                  </span>
                  <span>
                    <span className="block text-lg leading-tight font-bold group-hover:underline md:text-xl">
                      {pick(other.title)}
                    </span>
                    <span className="tabular mt-1 block text-sm font-medium text-ink-2">
                      {pick(other.duration)} · {pick(other.price)}
                    </span>
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
