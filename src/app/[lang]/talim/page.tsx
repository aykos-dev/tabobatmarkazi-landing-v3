import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ApplyForm, ApplyLink } from "@/components/ApplyForm";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { courses } from "@/data/courses";
import { getSection } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { isLocale, localize, type Locale } from "@/lib/i18n";

const section = getSection("education");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(section.title, lang)} — Tabobat Markazi`,
    description: localize(d.educationLede, lang),
  };
}

export default async function EducationPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);

  return (
    <SiteShell lang={lang} current="education">
      <SectionBand as="h1" section={section} title={pick(section.title)} lede={pick(d.educationLede)}>
        <figure className="mb-10 md:mb-16">
          <div className="relative aspect-[16/10] overflow-hidden bg-stone md:aspect-[21/8]">
            <Image
              src="/images/concept/zone4-lab.jpg"
              alt={pick({
                uz: "Dorivor o'simliklar bilan ishlash uchun laboratoriya",
                ru: "Лаборатория для работы с лекарственными растениями",
                en: "A laboratory for working with medicinal plants",
              })}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <figcaption className="mt-2 text-xs text-ink-3">{pick(d.conceptCaption)}</figcaption>
        </figure>

        {/* The course register: one row per course, terms in plain sight */}
        <table className="w-full border-collapse text-left">
          <thead className="hidden md:table-header-group">
            <tr className="border-b-2 border-ink text-sm text-ink-2">
              <th scope="col" className="w-20 py-2 font-medium">№</th>
              <th scope="col" className="py-2 pr-6 font-medium">{pick(d.table.course)}</th>
              <th scope="col" className="w-32 py-2 pr-6 font-medium">{pick(d.table.duration)}</th>
              <th scope="col" className="w-52 py-2 pr-6 text-right font-medium">{pick(d.table.price)}</th>
              <th scope="col" className="w-40 py-2">
                <span className="sr-only">{pick(d.apply)}</span>
              </th>
            </tr>
          </thead>
          <tbody className="border-t-2 border-ink md:border-t-0">
            {courses.map((course, index) => (
              <tr
                key={course.id}
                className="grid grid-cols-[2.75rem_1fr_auto] gap-x-3 border-b-2 border-ink py-5 md:table-row md:py-0"
              >
                <td className="tabular row-span-4 pt-1 text-sm font-bold text-cobalt md:py-7 md:align-top md:text-base">
                  {section.number}.{index + 1}
                </td>
                <td className="col-span-2 md:py-7 md:pr-6 md:align-top">
                  <Link
                    href={`/${lang}/${section.slug}/${course.id}`}
                    className="group inline-flex items-baseline gap-2 text-xl leading-tight font-bold tracking-[-0.02em] no-underline hover:underline md:text-3xl"
                  >
                    {pick(course.title)}
                    <ArrowRight
                      aria-hidden
                      className="size-5 shrink-0 self-center transition-transform duration-300 ease-out group-hover:translate-x-1"
                      strokeWidth={2.5}
                    />
                  </Link>
                  <p className="mt-2 max-w-[60ch] leading-snug text-ink-2 md:text-lg">{pick(course.description)}</p>
                  <p className="mt-2 text-sm leading-snug text-ink-2">
                    <span className="font-bold text-ink">{pick(d.table.requirements)}:</span>{" "}
                    {pick(course.requirements)}
                  </p>
                </td>
                <td className="tabular mt-3 font-medium md:mt-0 md:py-7 md:pr-6 md:align-top md:text-lg">
                  {pick(course.duration)}
                </td>
                <td className="tabular mt-3 text-right text-lg font-bold whitespace-nowrap md:mt-0 md:py-7 md:pr-6 md:align-top md:text-2xl">
                  {pick(course.price)}
                </td>
                <td className="col-span-2 col-start-2 mt-4 md:mt-0 md:py-7 md:align-top">
                  <ApplyLink
                    courseId={course.id}
                    className="inline-flex h-12 w-full items-center justify-center border-2 border-cobalt px-5 font-bold text-cobalt no-underline transition-colors duration-200 hover:bg-cobalt hover:text-on-cobalt md:w-auto"
                  >
                    {pick(d.apply)}
                  </ApplyLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-14 grid md:mt-24 md:grid-cols-12 md:gap-x-6">
          <div className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
            <ApplyForm
              lang={lang}
              courses={courses.map((course) => ({ id: course.id, label: pick(course.title) }))}
            />
          </div>
        </div>
      </SectionBand>
    </SiteShell>
  );
}
