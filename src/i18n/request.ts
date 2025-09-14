import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async (all) => {
  const locale = (await all.requestLocale) || "en";
  return {
    locale,
    timeZone: "Asia/Yerevan",
    messages: {
      albums: (await import(`../../public/locales/${locale}/albums.json`))
        .default,
      media: (await import(`../../public/locales/${locale}/media.json`))
        .default,
      ...(await import(`../../public/locales/${locale}/texts-body.json`))
        .default,
      texts: (await import(`../../public/locales/${locale}/texts.json`))
        .default,
      exhibitions: (
        await import(`../../public/locales/${locale}/exhibitions.json`)
      ).default,
      images: (await import(`../../public/locales/${locale}/images.json`))
        .default,
      ...(await import(`../../public/locales/${locale}/meta.json`)).default,
    },
  };
});
