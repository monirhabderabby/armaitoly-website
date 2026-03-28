// app/robots.ts
import { mainDomain } from "@/constants";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${mainDomain}/post-sitemap.xml`,
  };
}
