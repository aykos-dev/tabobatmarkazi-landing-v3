export const locales = ["uz", "ru", "en"] as const;

export type Locale = (typeof locales)[number];

/** A value provided in each supported language. */
export type Localized<T> = Record<Locale, T>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Resolve a Localized<T> to the given locale, falling back to Uzbek. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale] ?? value.uz;
}
