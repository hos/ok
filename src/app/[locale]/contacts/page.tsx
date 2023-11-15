import { Metadata } from "next";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Meta } from "src/components/Meta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return { title: t("Contacts"), description: t("description") };
}

const Contacts: React.FC<{}> = async () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Meta />

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
    </div>
  );
};

export default Contacts;
