import type { Metadata } from "next";

import { DirectionPage, directionMetadata } from "@/components/DirectionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return directionMetadata("standardization", (await params).lang);
}

export default async function StandardizationPage({ params }: { params: Promise<{ lang: string }> }) {
  return <DirectionPage id="standardization" lang={(await params).lang} />;
}
