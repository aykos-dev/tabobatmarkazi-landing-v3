import type { Metadata } from "next";

import { DirectionPage, directionMetadata } from "@/components/DirectionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return directionMetadata("international", (await params).lang);
}

export default async function InternationalPage({ params }: { params: Promise<{ lang: string }> }) {
  return <DirectionPage id="international" lang={(await params).lang} />;
}
