import { fetchList, fetchOne, full, type ApiLocalized } from "@/lib/api";
import type { Localized } from "@/lib/i18n";

/** Managed in the admin under Content → News. */
export interface NewsArticle {
  slug: string;
  image: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  title: Localized<string>;
  description: Localized<string>;
  /** Full article body as Markdown. */
  body: Localized<string>;
}

interface ApiNews {
  slug: string;
  imageUrl: string;
  date: string;
  title: ApiLocalized;
  description: ApiLocalized;
  body: ApiLocalized;
}

function toArticle(n: ApiNews): NewsArticle {
  return {
    slug: n.slug,
    image: n.imageUrl,
    date: n.date,
    title: full(n.title),
    description: full(n.description),
    body: full(n.body),
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
