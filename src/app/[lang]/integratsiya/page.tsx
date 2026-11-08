import type { Metadata } from "next";

import { DirectionPage, directionMetadata } from "@/components/DirectionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return directionMetadata("integration", (await params).lang);
}

export default async function IntegrationPage({ params }: { params: Promise<{ lang: string }> }) {
  return <DirectionPage id="integration" lang={(await params).lang} />;
}
