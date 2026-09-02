import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contacts">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return { title: t("Contacts"), description: t("description") };
}

const Contacts = async (props: PageProps<"/[locale]/contacts">) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  return (
    <div className="w-full flex flex-col items-center">
      <Link
        className="font-width-500 text-base"
        href="mailto:karenohanyan.art@gmail.com"
        target="_blank"
      >
        google: karenohanyan.art@gmail.com
      </Link>
      <Link
        className="font-width-500 text-base"
        href="https://www.facebook.com/karen.ohanyan.14"
        target="_blank"
      >
        facebook: karen.ohanyan.14
      </Link>
      <Link
        className="font-width-500 text-base"
        href="https://www.instagram.com/ok_art_karenohanyan/"
        target="_blank"
      >
        instagram: @ok_art_karenohanyan
      </Link>
    </div>
  );
};

export default Contacts;
