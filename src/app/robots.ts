import { MetadataRoute } from "next";

import { host } from "../config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: `https://${host}`,
    sitemap: `https://${host}/sitemap.xml`,
  };
}
