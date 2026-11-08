import type { Metadata } from "next";

import { DirectionPage, directionMetadata } from "@/components/DirectionPage";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  return directionMetadata("biolab", (await params).lang);
}

export default async function BiolabPage({ params }: { params: Promise<{ lang: string }> }) {
  return <DirectionPage id="biolab" lang={(await params).lang} />;
}
