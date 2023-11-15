const withNextIntl = require("next-intl/plugin")();
const age = 60 * 60 * 24 * 365;

/** @type {import('next').NextConfig} */
module.exports = withNextIntl({
  reactStrictMode: true,
  headers() {
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
    minimumCacheTTL: age,
  },
});
