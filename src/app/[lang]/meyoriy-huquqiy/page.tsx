import { FileText, Folder } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import documentArt from "@/assets/document-trimmed.png";
import { DocumentLibrary, type LibraryCategory, type LibraryDocument } from "@/components/DocumentLibrary";
import { SectionBand } from "@/components/SectionBand";
import { SiteShell } from "@/components/SiteShell";
import { canPreview, downloadHref, getDocumentCategories, getDocuments } from "@/data/documents";
import { getSection } from "@/data/sections";
import { dictionary as d } from "@/i18n/dictionary";
import { formatBytes } from "@/lib/format";
import { isLocale, localize, type Locale } from "@/lib/i18n";

const section = getSection("legal");

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  return {
    title: `${localize(d.documents.title, lang)} — Tabobat Markazi`,
    description: localize(d.documents.lede, lang),
  };
}

/** 06: the centre's legal and regulatory documents, managed in the admin under Content → Documents. */
export default async function LegalPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const pick = <T,>(value: Record<Locale, T>) => localize(value, lang);
  const [documents, allCategories] = await Promise.all([getDocuments(), getDocumentCategories()]);

  const items: LibraryDocument[] = documents.map((doc) => ({
    slug: doc.slug,
    title: pick(doc.title),
    description: doc.description ? pick(doc.description) : undefined,
    categorySlug: doc.category?.slug,
    categoryName: doc.category ? pick(doc.category.name) : undefined,
    date: doc.date,
    dateLabel: pick(d.documents.year)(Number(doc.date.slice(0, 4))),
    format: doc.file.format,
    sizeLabel: formatBytes(doc.file.size, lang),
    viewUrl: canPreview(doc.file.format) ? doc.file.url : undefined,
    downloadUrl: downloadHref(doc.slug),
  }));
  // Only categories that hold a document, in the admin's order.
  const categories: LibraryCategory[] = allCategories
    .map((category) => ({
      slug: category.slug,
      name: pick(category.name),
      count: documents.filter((doc) => doc.category?.slug === category.slug).length,
    }))
    .filter((category) => category.count > 0);

  return (
    <SiteShell lang={lang} current="legal">
      <SectionBand as="h1" section={section} title={pick(d.documents.title)} lede={pick(d.documents.lede)}>
        <div className="mb-10 grid items-center gap-6 border-b-2 border-ink pb-8 md:mb-14 md:grid-cols-12 md:gap-x-6 md:pb-10">
          <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 text-lg font-bold md:col-span-8 md:text-xl">
            <div className="flex items-center gap-2">
              <dt className="sr-only">{pick(d.documents.heading)}</dt>
              <FileText aria-hidden className="size-6" strokeWidth={2} />
              <dd className="tabular">{pick(d.documents.count)(documents.length)}</dd>
            </div>
            {categories.length > 0 && (
              <div className="flex items-center gap-2 border-l-2 border-ink pl-6">
                <dt className="sr-only">{pick(d.documents.filterLabel)}</dt>
                <Folder aria-hidden className="size-6" strokeWidth={2} />
                <dd className="tabular">{pick(d.documents.categoryCount)(categories.length)}</dd>
              </div>
            )}
          </dl>
          {/* The section's plate: an illustration, so no caption. Hidden on phones to get to the list sooner. */}
          <div className="hidden md:col-span-3 md:col-start-10 md:flex md:justify-end">
            <Image src={documentArt} alt="" sizes="11rem" className="h-auto w-44" />
          </div>
        </div>

        {items.length ? (
          <DocumentLibrary
            documents={items}
            categories={categories}
            labels={{
              search: pick(d.documents.search),
              searchLabel: pick(d.documents.searchLabel),
              filterLabel: pick(d.documents.filterLabel),
              all: pick(d.documents.all),
              heading: pick(d.documents.heading),
              viewLabel: pick(d.documents.viewLabel),
              list: pick(d.documents.list),
              cards: pick(d.documents.cards),
              view: pick(d.documents.view),
              download: pick(d.documents.download),
              opensInTab: pick(d.documents.opensInTab),
              noMatches: pick(d.documents.noMatches),
              reset: pick(d.documents.reset),
            }}
          />
        ) : (
          <p className="max-w-[48ch] text-lg text-ink-2">{pick(d.documents.empty)}</p>
        )}
      </SectionBand>
    </SiteShell>
  );
}
