const { i18n } = require("./next-i18next.config");
const albums = require("./data/albums.json");
const articles = require("./data/articles.json");

module.exports = {
  siteUrl: process.env.HOST_URL || "https://karenohanyan.art",
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
          alternateRefs: i18n.locales.map((locale) => {
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
