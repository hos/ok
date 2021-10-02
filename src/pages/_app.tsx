import "src/styles/globals.css";

import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { Layout } from "src/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

export default appWithTranslation(MyApp);
