const albums = require("./src/data/albums.json");
const articles = require("./src/data/articles.json");

const locales = ["en", "ru", "hy"];

module.exports = {
  siteUrl: process.env.HOST_URL || "https://www.karenohanyan.art",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async (config) => {
    const result = [];

    for (const album of albums) {
      for (const img of album.images) {
        result.push({
          loc: `/${album.path}/${img.fileName.replace(".jpg", "")}`,
          changefreq: "yearly",
          priority: 0.7,
          lastmod: new Date().toISOString(),
          alternateRefs: locales.map((locale) => {
            return {
              href: `${config.siteUrl}/${locale}`,
              hreflang: locale,
              loc: `/${album}/${img.fileName.replace(".jpg", "")}`,
            };
          }),
        });
      }
    }

    for (const [key] of Object.entries(articles)) {
      result.push({
        loc: `/articles/${key}`,
        changefreq: "yearly",
        priority: 0.7,
        lastmod: new Date().toISOString(),
        alternateRefs: i18n.locales.map((locale) => {
          return {
            href: `${config.siteUrl}/${locale}`,
            hreflang: locale,
            loc: `/articles/${key}`,
          };
        }),
      });
    }

    return result;
  },
};
