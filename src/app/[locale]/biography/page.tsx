import fs from "fs/promises";
import { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";

import KarenOhanyan from "@/public/images/Karen-Ohanyan.jpg";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/biography">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return { title: t("Biography"), description: t("description") };
}

const Biography = async (props: PageProps<"/[locale]/biography">) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();

  const content = await fs.readFile(
    `${process.cwd()}/public/locales/${locale}/docs/biography.html`,
    "utf-8",
  );

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
      <h1 className="m-0 pb-5">{t("Biography")}</h1>
      <Image
        src={KarenOhanyan}
        alt="Karen Ohanyan Portrait"
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain",
          objectPosition: "left",
        }}
      />

      <div
        className="py-10 max-md:px-2"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  );
};

export default Biography;
