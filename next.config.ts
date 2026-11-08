import type { NextConfig } from "next";

/**
 * Content images come from the questionnaire backend's object storage (MinIO).
 * CONTENT_MEDIA_URL is the public base of those images, e.g. https://example.uz/media
 * or http://localhost:9000/content in local development.
 */
const mediaUrl = new URL(process.env.CONTENT_MEDIA_URL ?? "http://localhost:9000/content");
const isLocalMedia = ["localhost", "127.0.0.1", "::1"].includes(mediaUrl.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL(`${mediaUrl.origin}${mediaUrl.pathname.replace(/\/+$/, "")}/**`)],
    // Only for local MinIO; production media is served from a public host.
    dangerouslyAllowLocalIP: isLocalMedia,
  },
};

export default nextConfig;
