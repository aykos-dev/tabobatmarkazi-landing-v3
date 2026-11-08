import { fetchList, fetchOne, full, type ApiLocalized } from "@/lib/api";
import type { Localized } from "@/lib/i18n";

/** Managed in the admin under Content → News. */
export interface NewsArticle {
  slug: string;
  /** Cover image. */
  image: string;
  /** More photos, in display order. */
  images: string[];
  /** ISO date (YYYY-MM-DD); optional, shown when set. */
  date?: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Full article body as Markdown; empty for a story that links to its source. */
  body: Localized<string>;
  /** Set when the story lives on another site: links go straight there. */
  externalUrl?: string;
}

interface ApiNews {
  slug: string;
  imageUrl: string;
  imageUrls?: (string | null)[];
  date: string | null;
  title: ApiLocalized;
  description: ApiLocalized;
  body: ApiLocalized | null;
  externalUrl: string | null;
}

function toArticle(n: ApiNews): NewsArticle {
  return {
    slug: n.slug,
    image: n.imageUrl,
    images: (n.imageUrls ?? []).filter((url): url is string => Boolean(url)),
    date: n.date ?? undefined,
    title: full(n.title),
    description: full(n.description),
    body: n.body?.uz ? full(n.body) : { uz: "", ru: "", en: "" },
    externalUrl: n.externalUrl ?? undefined,
  };
}

/** Newest first (the API orders by date). */
export async function latestNews(): Promise<NewsArticle[]> {
  return (await fetchList<ApiNews>("news")).map(toArticle);
}

export async function getArticle(slug: string): Promise<NewsArticle | undefined> {
  const n = await fetchOne<ApiNews>("news", slug);
  return n ? toArticle(n) : undefined;
}

/** Where a story's links go: its own article page, or the source site. */
export function newsLink(article: NewsArticle, lang: string): { href: string; external: boolean } {
  return article.externalUrl
    ? { href: article.externalUrl, external: true }
    : { href: `/${lang}/yangiliklar/${article.slug}`, external: false };
}

/** "https://www.kun.uz/news/1" -> "kun.uz" */
export function sourceHost(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
