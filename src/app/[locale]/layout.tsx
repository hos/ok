import "@/src/styles/globals.css";

import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { ReactNode } from "react";

import AppRouterNavigation from "@/src/components/AppRouterNavigation";
import { Shortcuts } from "@/src/components/Shortcuts";
import { locales } from "@/src/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Karen Ohanyan"),
    description: t("description"),
    metadataBase: new URL("https://karenohanyan.art"),
  };
}

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) => {
  const messages = await getMessages();

  if (!locales.includes(locale as any)) notFound();

  return (
    <html lang={locale}>
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
          <div className="flex flex-row">
            <div className="w-[99%] md:w-3/4 py-8 inline-flex mt-14">
              {children}
            </div>
            <AppRouterNavigation locale={locale} />
            <Shortcuts />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
