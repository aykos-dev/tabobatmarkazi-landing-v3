import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import documentArt from "@/assets/document-trimmed.png";
import type { LegalDocument } from "@/data/documents";
import { getSection, sectionHref } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { localize, type Locale } from "@/lib/i18n";

const LATEST = 4;

/** 06 on the home page: the newest documents, each a way into the library. */
export function DocumentsSummary({ documents, lang }: { documents: LegalDocument[]; lang: Locale }) {
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const href = sectionHref(getSection("legal"), lang);

  return (
    <div className="grid gap-8 md:grid-cols-12 md:gap-x-6">
      <div className="md:col-span-5">
        <Image src={documentArt} alt="" sizes="(min-width: 768px) 30vw, 60vw" className="h-auto w-2/5 md:w-3/5" />
        <Link
          href={href}
          className="group mt-6 inline-flex h-14 items-center gap-2 border-2 border-ink px-6 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
        >
          {pick(d.documents.openAll)(documents.length)}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1"
            strokeWidth={2.5}
          />
        </Link>
      </div>
      <div className="md:col-span-7">
        <h3 className="border-b-2 border-ink pb-3 text-sm font-bold tracking-[0.06em] uppercase">
          {pick(d.documents.latest)}
        </h3>
        {documents.length ? (
          <ol>
            {documents.slice(0, LATEST).map((doc) => (
              <li key={doc.slug}>
                <Link
                  href={href}
                  className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-3 border-b-2 border-ink py-4 no-underline md:grid-cols-[4rem_1fr]"
                >
                  <span className="tabular text-sm font-bold uppercase">{doc.file.format}</span>
                  <span>
                    <span className="block text-lg leading-tight font-bold group-hover:underline md:text-xl">
                      {pick(doc.title)}
                    </span>
                    <span className="mt-1 block text-sm text-ink-2">
                      {doc.category && `${pick(doc.category.name)} · `}
                      <time dateTime={doc.date} className="tabular">
                        {pick(d.documents.year)(Number(doc.date.slice(0, 4)))}
                      </time>
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="py-4 text-lg text-ink-2">{pick(d.documents.empty)}</p>
        )}
      </div>
    </div>
  );
}
