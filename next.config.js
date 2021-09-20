const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
module.exports = {
  i18n,
  reactStrictMode: true,
  headers() {
    const age = 60 * 60 * 24 * 30;
    return [
      {
        source: "/:all*(svg|jpg|png)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: `public, max-age=${age}, s-maxage=${age}, immutable`,
          },
        ],
      },
    ];
  },
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};
