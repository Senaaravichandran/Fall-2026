import type { MetadataRoute } from "next";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://niyam-fall-2026.vercel.app").replace(/\/$/, "");

const ROUTES: { path: string; priority: number }[] = [
  { path: "/console", priority: 1 },
  { path: "/prd", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE}${r.path === "/" ? "" : r.path}`,
    lastModified,
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
