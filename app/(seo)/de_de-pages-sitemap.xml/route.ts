import { mainDomain } from "@/constants";

const SITE_URL = mainDomain;

const pages = [
  { path: "/de/faq", lastmod: "2026-03-10" },
  { path: "/de/koh-phangan-accommodation", lastmod: "2026-03-10" },
  { path: "/de/contact", lastmod: "2026-03-10" },
  { path: "/de/terms-conditions", lastmod: "2026-03-10" },
  { path: "/de/oct-nov-deals", lastmod: "2026-03-10" },
  { path: "/de/blog", lastmod: "2026-03-10" },
];

export async function GET() {
  const urls = pages
    .map(
      (page) => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${new Date(page.lastmod).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
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
