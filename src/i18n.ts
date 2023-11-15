import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => ({
  timeZone: "Asia/Yerevan",
  messages: {
    albums: (await import(`../public/locales/${locale}/albums.json`)).default,
    ...(await import(`../public/locales/${locale}/articles-desc.json`)).default,
    articles: (await import(`../public/locales/${locale}/articles.json`))
      .default,
    exhibitions: (await import(`../public/locales/${locale}/exhibitions.json`))
      .default,
    images: (await import(`../public/locales/${locale}/images.json`)).default,
    ...(await import(`../public/locales/${locale}/meta.json`)).default,
  },
}));

export const locales = ["en", "ru", "hy"];
