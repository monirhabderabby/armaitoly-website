// app/blog-posts-sitemap.xml/route.ts
import { baseUrl, mainDomain } from "@/constants";
import { Blog } from "@/types/blogs";

const SITE_URL = mainDomain;

async function getAllBlogs(): Promise<Blog[]> {
  try {
    let allBlogs: Blog[] = [];
    let page = 1;
    let totalPages = 1;

    while (page <= totalPages) {
      const res = await fetch(`${baseUrl}/blog?page=${page}&limit=100`, {
        next: { revalidate: 3600 },
      });
      if (!res.ok) break;

      const json = await res.json();
      const blogs: Blog[] = json.data ?? [];
      allBlogs = [...allBlogs, ...blogs];

      totalPages = json.meta?.pages ?? 1;
      page++;
    }

    return allBlogs;
  } catch {
    return [];
  }
}

export async function GET() {
  const blogs = await getAllBlogs();

  const urls = blogs
    .filter((blog) => blog.isPublished)
    .map((blog) => {
      const imageTag = blog.coverImage
        ? `
    <image:image>
      <image:loc>${blog.coverImage}</image:loc>
    </image:image>`
        : "";

      return `
  <url>
    <loc>${SITE_URL}/blog/${blog.slug}</loc>
    <lastmod>${new Date(blog.updatedAt ?? blog.createdAt).toISOString().split("T")[0]}</lastmod>${imageTag}
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
