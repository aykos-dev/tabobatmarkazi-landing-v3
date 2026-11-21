import { getDocument } from "@/data/documents";

/**
 * Serves a document as a download under its original name. Stored files open
 * inline (so PDFs can be viewed), and a cross-origin link can't force a download.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = await getDocument(slug);
  if (!doc) return new Response("Not found", { status: 404 });

  // Not cached by Next: files can be large and are already cached by the media host.
  const file = await fetch(doc.file.url, { cache: "no-store" });
  if (!file.ok || !file.body) return new Response("File unavailable", { status: 502 });

  // ASCII fallback for old clients, the real (often Cyrillic) name in filename*.
  const ascii = doc.file.name.replace(/[^\x20-\x7e]/g, "_").replace(/["\\]/g, "_");
  return new Response(file.body, {
    headers: {
      "Content-Type": file.headers.get("content-type") ?? "application/octet-stream",
      ...(file.headers.get("content-length") ? { "Content-Length": file.headers.get("content-length")! } : {}),
      "Content-Disposition": `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(doc.file.name)}`,
      "Cache-Control": "public, max-age=300",
    },
  });
}
