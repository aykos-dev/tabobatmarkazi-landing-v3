import type { Locale, Localized } from "@/lib/i18n";

/** Leading integer in a display string: "150 000 so'm" -> 150000, "8 hafta" -> 8. */
export function leadingNumber(value: string): number {
  const match = value.match(/\d[\d\s,]*/);
  return match ? Number(match[0].replace(/[\s,]/g, "")) : NaN;
}

/** The entry with the lowest price, or undefined for an empty list. */
export function cheapest<T>(items: T[], price: (item: T) => number): T | undefined {
  if (!items.length) return undefined;
  return items.reduce((min, item) => (price(item) < price(min) ? item : min));
}

/** 250000 -> "250 000 so'm" / "250 000 сум" / "250,000 UZS". */
export function formatPrice(amount: number, lang: Locale): string {
  if (lang === "en") return `${new Intl.NumberFormat("en-US").format(amount)} UZS`;
  // Plain spaces as thousands separators, as the centre writes prices.
  const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return lang === "ru" ? `${digits} сум` : `${digits} so'm`;
}

/** A UZS amount as display text in every language. */
export function priceText(amount: number): Localized<string> {
  return { uz: formatPrice(amount, "uz"), ru: formatPrice(amount, "ru"), en: formatPrice(amount, "en") };
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
