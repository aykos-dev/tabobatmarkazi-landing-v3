import { fetchList, full, optional, type ApiLocalized } from "@/lib/api";
import { priceText } from "@/lib/format";
import type { Localized } from "@/lib/i18n";

export interface ProductCategory {
  slug: string;
  name: Localized<string>;
}

/** Managed in the admin under Content → Products. */
export interface Product {
  /** Anchor on the Fitobar page. */
  id: string;
  image: string;
  title: Localized<string>;
  description: Localized<string>;
  price: Localized<string>;
  priceAmount: number;
  /* Shown on the Fitobar page only when the centre supplies them. */
  size?: Localized<string>;
  ingredients?: Localized<string>;
  usage?: Localized<string>;
  category?: ProductCategory;
}

interface ApiProduct {
  slug: string;
  imageUrl: string;
  title: ApiLocalized;
  description: ApiLocalized;
  price: number;
  size: ApiLocalized | null;
  ingredients: ApiLocalized | null;
  usage: ApiLocalized | null;
  category: { slug: string; name: ApiLocalized } | null;
}

function toProduct(p: ApiProduct): Product {
  return {
    id: p.slug,
    image: p.imageUrl,
    title: full(p.title),
    description: full(p.description),
    price: priceText(p.price),
    priceAmount: p.price,
    size: optional(p.size),
    ingredients: optional(p.ingredients),
    usage: optional(p.usage),
    category: p.category ? { slug: p.category.slug, name: full(p.category.name) } : undefined,
  };
}

export async function getProducts(): Promise<Product[]> {
  return (await fetchList<ApiProduct>("products", ["product-categories"])).map(toProduct);
}

export async function getProductCategories(): Promise<ProductCategory[]> {
  const rows = await fetchList<{ slug: string; name: ApiLocalized }>("product-categories");
  return rows.map((c) => ({ slug: c.slug, name: full(c.name) }));
}
