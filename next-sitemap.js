const { i18n } = require("./next-i18next.config");
const albums = require("./data/albums.json");
const articles = require("./data/articles.json");

module.exports = {
  siteUrl: process.env.HOST_URL || "https://karenohanyan.art",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  additionalPaths: async () => {
    const result = [];

    for (const locale of i18n.locales) {
      const others = i18n.locales.filter((l) => l !== locale);
      for (const album of albums) {
        // all possible values
        for (const img of album.images) {
          result.push({
            loc: `/${locale}/${album.path}/${img.fileName.replace(".jpg", "")}`,
            changefreq: "yearly",
            priority: 0.7,
            lastmod: new Date().toISOString(),

            // acts only on '/additional-page-2'
            alternateRefs: others.map((o) => {
              return {
                loc: `/${o}/${album}/${img.fileName.replace(".jpg", "")}`,
              };
            }),
          });
        }

        for (const [key] of Object.entries(articles)) {
          result.push({
            loc: `/${locale}/articles/${key}`,
            changefreq: "yearly",
            priority: 0.7,
            lastmod: new Date().toISOString(),

            // acts only on '/additional-page-2'
            alternateRefs: others.map((o) => {
              return {
                loc: `/${o}/articles/${key}`,
              };
            }),
          });
        }
      }
    }

    return result;
  },
};
