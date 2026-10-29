import type { Locale } from "@/lib/i18n";

/** Leading integer in a display string: "150 000 so'm" -> 150000, "8 hafta" -> 8. */
export function leadingNumber(value: string): number {
  const match = value.match(/\d[\d\s,]*/);
  return match ? Number(match[0].replace(/[\s,]/g, "")) : NaN;
}

/** The entry whose display price is lowest. */
export function cheapest<T>(items: T[], price: (item: T) => string): T {
  return items.reduce((min, item) =>
    leadingNumber(price(item)) < leadingNumber(price(min)) ? item : min,
  );
}

const dateLocales: Record<Locale, string> = { uz: "uz-Latn-UZ", ru: "ru-RU", en: "en-GB" };

/** "2026-06-15" -> "15-iyun, 2026" / "15 июня 2026 г." / "15 June 2026". */
export function formatDate(iso: string, lang: Locale): string {
  return new Intl.DateTimeFormat(dateLocales[lang], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}
