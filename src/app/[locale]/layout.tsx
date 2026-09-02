import "../../styles/globals.css";

import { Metadata } from "next";
import { Noto_Sans_Armenian } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Suspense } from "react";

import AppRouterNavigation from "@/src/components/AppRouterNavigation";
import { Hamburger } from "@/src/components/Hamburger";
import { Shortcuts } from "@/src/components/Shortcuts";
import { locales } from "@/src/config";

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  weight: "variable",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return {
    title: t("Karen Ohanyan"),
    description: t("description"),
    metadataBase: new URL("https://karenohanyan.art"),
    alternates: {
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: t("Karen Ohanyan"),
      description: t("description"),
      type: "website",
      images: ["/images/Karen-Ohanyan.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title: t("Karen Ohanyan"),
      description: t("description"),
      images: ["/images/Karen-Ohanyan.jpg"],
    },
  };
}

const RootLayout = async ({ children, params }: LayoutProps<"/[locale]">) => {
  const { locale } = await params;

  if (!locales.includes(locale as any)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={notoSansArmenian.className}>
      <head>
        <Script
          id="gtm"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);j.pre
})(window,document,'script','dataLayer','GTM-PXMSHCX');`,
          }}
        />
      </head>
      <body className={"show-works-menu"}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXMSHCX"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-row w-screen max-md:flex-col-reverse">
            <main className="md:w-3/4 py-12 h-screen">{children}</main>
            <AppRouterNavigation locale={locale} />
            <Suspense fallback={null}>
              <Hamburger />
            </Suspense>
            <Shortcuts />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
