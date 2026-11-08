import type { Localized } from "@/lib/i18n";

/**
 * Content comes from the questionnaire backend's public API.
 * Responses are cached (ISR) and tagged by content type; the backend calls
 * /api/revalidate after each admin edit, so changes show up within seconds.
 */
const API_URL = (process.env.CONTENT_API_URL ?? "http://localhost:3000/api").replace(/\/+$/, "");

/** Fallback refresh if an on-demand revalidation is ever missed. */
const REVALIDATE_SECONDS = 3600;

export type ContentTag = "services" | "news" | "doctors" | "products" | "product-categories" | "courses";

/** Text as the API returns it: Uzbek always, other languages when filled in. */
export interface ApiLocalized {
  uz: string;
  ru?: string;
  en?: string;
}

/** Fills missing languages with Uzbek so pages can always `localize()`. */
export function full(value: ApiLocalized): Localized<string> {
  return { uz: value.uz, ru: value.ru || value.uz, en: value.en || value.uz };
}

export function optional(value: ApiLocalized | null | undefined): Localized<string> | undefined {
  return value?.uz ? full(value) : undefined;
}

async function request<T>(path: string, tags: ContentTag[]): Promise<T | null> {
  const res = await fetch(`${API_URL}/public/${path}`, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Content API ${path}: HTTP ${res.status}`);
  return (await res.json()) as T;
}

export async function fetchList<T>(type: ContentTag, extraTags: ContentTag[] = []): Promise<T[]> {
  return (await request<T[]>(type, [type, ...extraTags])) ?? [];
}

export async function fetchOne<T>(
  type: ContentTag,
  slug: string,
  extraTags: ContentTag[] = [],
): Promise<T | null> {
  return request<T>(`${type}/${encodeURIComponent(slug)}`, [type, ...extraTags]);
}
