import type { Metadata } from "next";

import { DirectionPage, directionMetadata } from "@/components/DirectionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return directionMetadata("research", (await params).lang);
}

export default async function ResearchPage({ params }: { params: Promise<{ lang: string }> }) {
  return <DirectionPage id="research" lang={(await params).lang} />;
}
