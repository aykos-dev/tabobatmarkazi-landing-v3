import { fetchList, fetchOne, full, optional, type ApiLocalized } from "@/lib/api";
import type { Localized } from "@/lib/i18n";

export type DocumentFormat = "pdf" | "doc" | "docx" | "xls" | "xlsx";

export interface DocumentCategory {
  slug: string;
  name: Localized<string>;
}

/** Managed in the admin under Content → Documents. */
export interface LegalDocument {
  slug: string;
  title: Localized<string>;
  description?: Localized<string>;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  category?: DocumentCategory;
  file: {
    url: string;
    /** Original file name, used for downloads. */
    name: string;
    /** Bytes. */
    size: number;
    format: DocumentFormat;
  };
}

interface ApiDocument {
  slug: string;
  title: ApiLocalized;
  description: ApiLocalized | null;
  date: string;
  file: { name: string; size: number; format: DocumentFormat };
  fileUrl: string;
  category: { slug: string; name: ApiLocalized } | null;
}

function toDocument(d: ApiDocument): LegalDocument {
  return {
    slug: d.slug,
    title: full(d.title),
    description: optional(d.description),
    date: d.date,
    category: d.category ? { slug: d.category.slug, name: full(d.category.name) } : undefined,
    file: { url: d.fileUrl, name: d.file.name, size: d.file.size, format: d.file.format },
  };
}

/** Newest first (the API orders by date). */
export async function getDocuments(): Promise<LegalDocument[]> {
  return (await fetchList<ApiDocument>("documents", ["document-categories"])).map(toDocument);
}

export async function getDocument(slug: string): Promise<LegalDocument | undefined> {
  const d = await fetchOne<ApiDocument>("documents", slug, ["document-categories"]);
  return d ? toDocument(d) : undefined;
}

/** In the admin's order. */
export async function getDocumentCategories(): Promise<DocumentCategory[]> {
  const rows = await fetchList<{ slug: string; name: ApiLocalized }>("document-categories");
  return rows.map((c) => ({ slug: c.slug, name: full(c.name) }));
}

/** Only PDFs open in the browser; Word and Excel files download. */
export const canPreview = (format: DocumentFormat) => format === "pdf";

/** Where "Download" points: a route that serves the file as an attachment under its own name. */
export const downloadHref = (slug: string) => `/api/documents/${encodeURIComponent(slug)}/download`;
