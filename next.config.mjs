import createNextIntlPlugin from "next-intl/plugin";
import { withMDX } from '@next/mdx';

const withNextIntl = createNextIntlPlugin();

const age = 60 * 60 * 24 * 365;

const nextConfig = {
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
};

export default withNextIntl(withMDX(nextConfig));
