// app/blog-categories-sitemap.xml/route.ts
import { mainDomain } from "@/constants";

const SITE_URL = mainDomain;

const categories = [
  { path: "/blog", lastmod: "2026-03-15" },
  { path: "/blog/categories/thailand", lastmod: "2024-11-26" },
  { path: "/blog/categories/koh-phangan", lastmod: "2024-11-26" },
];

export async function GET() {
  const urls = categories
    .map(
      (cat) => `
  <url>
    <loc>${SITE_URL}${cat.path}</loc>
    <lastmod>${new Date(cat.lastmod).toISOString()}</lastmod>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
