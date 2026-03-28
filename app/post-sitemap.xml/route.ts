// app/post-sitemap.xml/route.ts
import { baseUrl, mainDomain } from "@/constants";

const SITE_URL = mainDomain;

async function getAllBlogs() {
  try {
    const res = await fetch(`${baseUrl}/blog`, {
      next: { revalidate: 3600 }, // re-fetch every hour
    });
    if (!res.ok) return [];
    const json = await res.json();
    return json.data ?? [];
  } catch {
    return [];
  }
}

export async function GET() {
  const blogs = await getAllBlogs();

  const urls = blogs
    .filter((blog: { isPublished: boolean }) => blog.isPublished)
    .map(
      (blog: {
        _id: string;
        updatedAt?: string;
        createdAt: string;
        slug: string;
      }) => `
  <url>
    <loc>${SITE_URL}/blog/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt ?? blog.createdAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
>
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
