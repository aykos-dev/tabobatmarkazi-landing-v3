import { fetchList, fetchOne, full, optional, type ApiLocalized } from "@/lib/api";
import { priceText } from "@/lib/format";
import type { Localized } from "@/lib/i18n";

/** Managed in the admin under Content → Services. */
export interface Service {
  /** URL slug. */
  id: string;
  images: string[];
  title: Localized<string>;
  description: Localized<string>;
  /** Display text in each language, e.g. "250 000 so'm". */
  price: Localized<string>;
  /** Price in UZS. */
  priceAmount: number;
  /* Leaflet fields: rendered on the detail page only when the centre supplies them. */
  duration?: Localized<string>;
  indications?: Localized<string>;
  contraindications?: Localized<string>;
  preparation?: Localized<string>;
}

export interface ApiService {
  slug: string;
  imageUrls: string[];
  title: ApiLocalized;
  description: ApiLocalized;
  price: number;
  duration: ApiLocalized | null;
  indications: ApiLocalized | null;
  contraindications: ApiLocalized | null;
  preparation: ApiLocalized | null;
}

export function toService(s: ApiService): Service {
  return {
    id: s.slug,
    images: s.imageUrls ?? [],
    title: full(s.title),
    description: full(s.description),
    price: priceText(s.price),
    priceAmount: s.price,
    duration: optional(s.duration),
    indications: optional(s.indications),
    contraindications: optional(s.contraindications),
    preparation: optional(s.preparation),
  };
}

export async function getServices(): Promise<Service[]> {
  return (await fetchList<ApiService>("services")).map(toService);
}

export async function getService(id: string): Promise<Service | undefined> {
  const s = await fetchOne<ApiService>("services", id);
  return s ? toService(s) : undefined;
}
