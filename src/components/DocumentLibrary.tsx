"use client";

import { Download, Eye, LayoutGrid, List, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import type { DocumentFormat } from "@/data/documents";

export interface LibraryDocument {
  slug: string;
  title: string;
  description?: string;
  categorySlug?: string;
  categoryName?: string;
  date: string;
  dateLabel: string;
  format: DocumentFormat;
  sizeLabel: string;
  /** Set for formats the browser can show (PDF). */
  viewUrl?: string;
  downloadUrl: string;
}

export interface LibraryCategory {
  slug: string;
  name: string;
  count: number;
}

interface DocumentLibraryProps {
  documents: LibraryDocument[];
  categories: LibraryCategory[];
  labels: {
    search: string;
    searchLabel: string;
    filterLabel: string;
    all: string;
    heading: string;
    viewLabel: string;
    list: string;
    cards: string;
    view: string;
    download: string;
    opensInTab: string;
    noMatches: string;
    reset: string;
  };
}

type Layout = "list" | "cards";

const LAYOUT_KEY = "documents-layout";

/** Word and Excel take their applications' colours; PDF the pomegranate red. */
const badgeTone: Record<DocumentFormat, string> = {
  pdf: "bg-pomegranate text-on-pomegranate",
  doc: "bg-cobalt text-on-cobalt",
  docx: "bg-cobalt text-on-cobalt",
  xls: "bg-herb text-on-herb",
  xlsx: "bg-herb text-on-herb",
};

/** Case, accents and the many Uzbek apostrophes (o', oʻ, o’) don't matter when searching. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[ʻʼ’‘`'´]/g, "");
}

/**
 * The 06 documents library: search by title, filter by category, read as a
 * ruled list or as cards. Each document opens in the browser (PDF) and downloads.
 */
export function DocumentLibrary({ documents, categories, labels }: DocumentLibraryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [layout, setLayout] = useState<Layout>("list");

  // The reader's last layout, when the browser lets us remember it.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(LAYOUT_KEY);
      if (saved === "list" || saved === "cards") setLayout(saved);
    } catch {}
  }, []);

  function chooseLayout(next: Layout) {
    setLayout(next);
    try {
      window.localStorage.setItem(LAYOUT_KEY, next);
    } catch {}
  }

  const shown = useMemo(() => {
    const words = normalize(query).split(/\s+/).filter(Boolean);
    return documents.filter((doc) => {
      if (category && doc.categorySlug !== category) return false;
      const haystack = normalize(`${doc.title} ${doc.description ?? ""}`);
      return words.every((word) => haystack.includes(word));
    });
  }, [documents, query, category]);

  const chip =
    "inline-flex h-11 shrink-0 items-center gap-1.5 border-2 border-ink px-4 font-bold whitespace-nowrap transition-colors duration-200 hover:bg-ink hover:text-paper aria-pressed:bg-ink aria-pressed:text-paper";
  const toggle =
    "inline-flex h-11 items-center gap-2 border-2 border-ink px-3 font-bold transition-colors duration-200 hover:bg-ink hover:text-paper aria-pressed:bg-ink aria-pressed:text-paper sm:px-4";

  return (
    <div>
      <div className="relative">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" strokeWidth={2.5} />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={labels.search}
          aria-label={labels.searchLabel}
          className="h-14 w-full border-2 border-ink bg-paper pr-12 pl-12 text-lg placeholder:text-ink-3 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label={labels.reset}
            className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center hover:bg-stone"
          >
            <X aria-hidden className="size-5" strokeWidth={2.5} />
          </button>
        )}
      </div>

      {categories.length > 0 && (
        // Phones: one row that scrolls sideways. Wider: the chips wrap.
        <div
          role="group"
          aria-label={labels.filterLabel}
          className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:mt-6 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <button type="button" className={chip} aria-pressed={category === null} onClick={() => setCategory(null)}>
            {labels.all} <span className="tabular font-medium">({documents.length})</span>
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              className={chip}
              aria-pressed={category === c.slug}
              onClick={() => setCategory(category === c.slug ? null : c.slug)}
            >
              {c.name} <span className="tabular font-medium">({c.count})</span>
            </button>
          ))}
        </div>
      )}

      <div className="mt-10 flex items-end justify-between gap-4 md:mt-14">
        <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-5xl">
          {labels.heading}
          <span className="tabular ml-3 text-base font-medium text-ink-2 md:text-xl" aria-live="polite">
            {shown.length}
          </span>
        </h2>
        <div role="group" aria-label={labels.viewLabel} className="flex shrink-0 gap-2">
          <button type="button" className={toggle} aria-pressed={layout === "list"} onClick={() => chooseLayout("list")}>
            <List aria-hidden className="size-5" strokeWidth={2.5} />
            <span className="sr-only sm:not-sr-only">{labels.list}</span>
          </button>
          <button type="button" className={toggle} aria-pressed={layout === "cards"} onClick={() => chooseLayout("cards")}>
            <LayoutGrid aria-hidden className="size-5" strokeWidth={2.5} />
            <span className="sr-only sm:not-sr-only">{labels.cards}</span>
          </button>
        </div>
      </div>

      {!shown.length ? (
        <div className="mt-5 border-t-2 border-ink pt-6 md:mt-8">
          <p className="max-w-[48ch] text-lg text-ink-2">{labels.noMatches}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(null);
            }}
            className="mt-4 inline-flex h-12 items-center border-2 border-ink px-5 font-bold transition-colors duration-200 hover:bg-ink hover:text-paper"
          >
            {labels.reset}
          </button>
        </div>
      ) : layout === "list" ? (
        <ol className="mt-5 border-t-2 border-ink md:mt-8">
          {shown.map((doc) => (
            <li
              key={doc.slug}
              className="grid grid-cols-[3rem_1fr] gap-x-4 gap-y-4 border-b-2 border-ink py-5 md:grid-cols-[3.5rem_1fr_auto] md:items-center md:gap-x-6"
            >
              <FormatBadge format={doc.format} />
              <div className="min-w-0">
                <h3 className="text-lg leading-tight font-bold tracking-[-0.01em] md:text-xl">
                  <PrimaryLink doc={doc} labels={labels} />
                </h3>
                {doc.description && (
                  <p className="mt-1 line-clamp-2 max-w-[70ch] text-sm leading-snug text-ink-2 md:text-base">
                    {doc.description}
                  </p>
                )}
                <Meta doc={doc} />
              </div>
              <Actions doc={doc} labels={labels} className="col-span-2 md:col-span-1" />
            </li>
          ))}
        </ol>
      ) : (
        <ol className="mt-5 grid gap-4 sm:grid-cols-2 md:mt-8 md:gap-6 lg:grid-cols-3">
          {shown.map((doc) => (
            <li key={doc.slug} className="flex flex-col border-2 border-ink">
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <FormatBadge format={doc.format} />
                  {doc.categoryName && <CategoryTag name={doc.categoryName} />}
                </div>
                <h3 className="mt-5 text-xl leading-tight font-bold tracking-[-0.01em]">
                  <PrimaryLink doc={doc} labels={labels} />
                </h3>
                {doc.description && (
                  <p className="mt-2 line-clamp-3 leading-snug text-ink-2">{doc.description}</p>
                )}
                <p className="tabular mt-auto pt-5 text-sm font-medium text-ink-2">
                  {doc.format.toUpperCase()} · {doc.sizeLabel} · <time dateTime={doc.date}>{doc.dateLabel}</time>
                </p>
              </div>
              <Actions doc={doc} labels={labels} className="border-t-2 border-ink" card />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

type Labels = DocumentLibraryProps["labels"];

function FormatBadge({ format }: { format: DocumentFormat }) {
  return (
    <span
      aria-hidden
      className={`grid size-12 shrink-0 place-items-center text-xs font-extrabold tracking-[0.04em] uppercase md:size-14 md:text-sm ${badgeTone[format]}`}
    >
      {format}
    </span>
  );
}

function CategoryTag({ name }: { name: string }) {
  return <span className="bg-stone px-2 py-0.5 text-sm font-bold text-on-stone">{name}</span>;
}

/** Category, format, size and date under the title. */
function Meta({ doc }: { doc: LibraryDocument }) {
  return (
    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-ink-2">
      {doc.categoryName && <CategoryTag name={doc.categoryName} />}
      {/* The separator travels with the line it introduces, so a wrap never leaves it dangling. */}
      <span className="tabular">
        {doc.categoryName && <span aria-hidden>· </span>}
        {doc.format.toUpperCase()} · {doc.sizeLabel} · <time dateTime={doc.date}>{doc.dateLabel}</time>
      </span>
    </p>
  );
}

/** The title opens the document where the browser can show it, and downloads it otherwise. */
function PrimaryLink({ doc, labels }: { doc: LibraryDocument; labels: Labels }) {
  return doc.viewUrl ? (
    <a href={doc.viewUrl} target="_blank" rel="noopener noreferrer" className="no-underline hover:underline">
      {doc.title}
      <span className="sr-only"> ({labels.opensInTab})</span>
    </a>
  ) : (
    <a href={doc.downloadUrl} download className="no-underline hover:underline">
      {doc.title}
    </a>
  );
}

function Actions({
  doc,
  labels,
  className = "",
  card = false,
}: {
  doc: LibraryDocument;
  labels: Labels;
  className?: string;
  card?: boolean;
}) {
  // Phones and cards: two equal buttons. A wide list row: two quiet links side by side.
  const action = card
    ? "flex h-12 flex-1 items-center justify-center gap-2 font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper"
    : "flex h-12 flex-1 items-center justify-center gap-2 border-2 border-ink font-bold no-underline transition-colors duration-200 hover:bg-ink hover:text-paper md:h-11 md:flex-none md:border-0 md:px-3 md:hover:bg-transparent md:hover:text-current md:hover:underline";
  return (
    <div className={`flex ${card ? "" : "gap-2 md:gap-1"} ${className}`}>
      {doc.viewUrl && (
        <a
          href={doc.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${action} ${card ? "border-r-2 border-ink" : ""}`}
        >
          <Eye aria-hidden className="size-5" strokeWidth={2.5} />
          {labels.view}
          <span className="sr-only">
            {" "}
            — {doc.title} ({labels.opensInTab})
          </span>
        </a>
      )}
      <a href={doc.downloadUrl} download className={action}>
        <Download aria-hidden className="size-5" strokeWidth={2.5} />
        {labels.download}
        <span className="sr-only">
          {" "}
          — {doc.title}, {doc.format.toUpperCase()} {doc.sizeLabel}
        </span>
      </a>
    </div>
  );
}
