import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

import type { ContentTag } from "@/lib/api";

const TAGS: ContentTag[] = ["services", "news", "doctors", "products", "product-categories", "courses"];

function secretMatches(given: string | null): boolean {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Called by the questionnaire backend after an admin edits content.
 * Body: { "type": "services" }. Header: x-revalidate-secret.
 * Pages using that content serve the old version once more while they refresh.
 */
export async function POST(request: Request) {
  if (!secretMatches(request.headers.get("x-revalidate-secret"))) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let type: unknown;
  try {
    ({ type } = await request.json());
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  if (!TAGS.includes(type as ContentTag)) {
    return NextResponse.json({ error: "unknown type" }, { status: 400 });
  }

  revalidateTag(type as ContentTag, "max");
  return NextResponse.json({ ok: true, revalidated: type });
}
