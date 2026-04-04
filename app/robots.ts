import { mainDomain } from "@/constants";
import { MetadataRoute } from "next";

const SITE_URL = mainDomain;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Global rule
        userAgent: "*",
        allow: "/",
        disallow: ["*?lightbox="],
      },
      {
        // Google Ads Bots
        userAgent: ["AdsBot-Google-Mobile", "AdsBot-Google"],
        disallow: ["/_partials*", "/pro-gallery-webapp/v1/galleries/*"],
      },
      {
        // Block PetalBot
        userAgent: "PetalBot",
        disallow: "/",
      },
      {
        // Crawl delay bots — Note: Next.js MetadataRoute doesn't support crawlDelay natively
        userAgent: "dotbot",
        allow: "/",
      },
      {
        userAgent: "AhrefsBot",
        allow: "/",
      },
    ],
    sitemap: [
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/de_de-sitemap.xml`,
      `${SITE_URL}/es_es-sitemap.xml`,
      `${SITE_URL}/fr_fr-sitemap.xml`,
    ],
  };
}
