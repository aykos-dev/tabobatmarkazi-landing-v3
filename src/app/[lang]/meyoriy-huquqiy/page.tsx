import type { Metadata } from "next";

import { DirectionPage, directionMetadata } from "@/components/DirectionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return directionMetadata("legal", (await params).lang);
}

export default async function LegalPage({ params }: { params: Promise<{ lang: string }> }) {
  return <DirectionPage id="legal" lang={(await params).lang} />;
}
