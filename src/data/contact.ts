import type { Localized } from "@/lib/i18n";

export const contact = {
  phones: ["+998 71 230 02 02", "+998 55 502 70 30"],
  instagram: "https://instagram.com/tabobatmarkazi",
  telegram: "https://t.me/tabobatmarkazi",
  youtube: "https://youtube.com/@tabobatmarkazi",
  address: {
    uz: "Toshkent sh., Olmazor tumani, Farobiy 2",
    ru: "г.Ташкент, Алмазарский район, Фаробий 2",
    en: "Farobiy 2, Almazar district, Tashkent city",
  } as Localized<string>,
  /** Opening hours; the contacts page asks visitors to call until this is set. */
  hours: undefined as Localized<string> | undefined,
  /** Address search used for "get directions" (the embed below centres the area, not a pin). */
  directionsQuery: "Toshkent, Olmazor tumani, Farobiy 2",
  /** Google Maps embed (no API key required). */
  mapSrc:
    "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2070.44341469609!2d69.1719686541665!3d41.35215742626193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1784663673180!5m2!1sen!2s",
};
