import { fetchList, fetchOne, full, optional, type ApiLocalized } from "@/lib/api";
import type { Localized } from "@/lib/i18n";
import { toService, type ApiService, type Service } from "./services";

/** Managed in the admin under Content → Doctors. */
export interface Tabib {
  /** URL slug. */
  id: string;
  image: string;
  name: Localized<string>;
  role: Localized<string>;
  description: Localized<string>;
  /* Shown on the tabib's page only when the centre supplies them. */
  experience?: Localized<string>;
  education?: Localized<string>;
  schedule?: Localized<string>;
  /** Published services this tabib performs. */
  services: Service[];
  instagram?: string;
  telegram?: string;
}

export interface ApiDoctor {
  slug: string;
  imageUrl: string;
  name: ApiLocalized;
  role: ApiLocalized;
  description: ApiLocalized;
  experience: ApiLocalized | null;
  education: ApiLocalized | null;
  schedule: ApiLocalized | null;
  instagram: string | null;
  telegram: string | null;
  services?: ApiService[];
}

export function toTabib(t: ApiDoctor): Tabib {
  return {
    id: t.slug,
    image: t.imageUrl,
    name: full(t.name),
    role: full(t.role),
    description: full(t.description),
    experience: optional(t.experience),
    education: optional(t.education),
    schedule: optional(t.schedule),
    services: (t.services ?? []).map(toService),
    instagram: t.instagram ?? undefined,
    telegram: t.telegram ?? undefined,
  };
}

// Doctor pages list their services, so they also refresh when services change.
export async function getTabibs(): Promise<Tabib[]> {
  return (await fetchList<ApiDoctor>("doctors", ["services"])).map(toTabib);
}

export async function getTabib(id: string): Promise<Tabib | undefined> {
  const t = await fetchOne<ApiDoctor>("doctors", id, ["services"]);
  return t ? toTabib(t) : undefined;
}
