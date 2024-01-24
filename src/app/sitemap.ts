import { MetadataRoute } from "next";

import { host, locales } from "@/src/config";
import albums from "@/src/data/albums.json";
import texts from "@/src/data/texts.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const album of albums) {
    for (const img of album.images) {
      for (const locale of locales) {
        urls.push({
          url: `https://${host}/${locale}/${album.path}/${img.fileName.replace(
            ".jpg",
            "",
          )}`,
          changeFrequency: "yearly",
          priority: 0.7,
          lastModified: new Date().toISOString(),
        });
      }
    }
  }

  for (const [key] of Object.entries(texts)) {
    for (const locale of locales) {
      urls.push({
        url: `https://${host}/${locale}/texts/${key}`,
        changeFrequency: "yearly",
        priority: 0.7,
        lastModified: new Date().toISOString(),
      });
    }
  }

  return urls;
}
