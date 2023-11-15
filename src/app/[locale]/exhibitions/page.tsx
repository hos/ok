import { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Meta } from "src/components/Meta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("exhibitions.Solo Exhibitions"),
    description: t("description"),
  };
}

const Exhibitions: React.FC<{}> = async () => {
  const t = await getTranslations("exhibitions");
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
      <Meta />
      <h1 className="text-xl m-0 m-0 pb-5">{t("Solo Exhibitions")}</h1>
      <Image
        src="/images/exhibition.jpg"
        alt="Exhibitions"
        width="481"
        height="393"
        className="max-w-full h-auto object-contain object-left"
        priority
      />
      <div className="py-10 text-xs leading-5">
        <p className="m-0 mt-0.5">
          <span className="text-red"> 2021 - </span>
          {t("sevan")}
        </p>

        <p className="m-0 mt-0.5">
          <span className="text-red"> 2016 - </span>
          {t("avantGarde")}
        </p>

        <p className="m-0 mt-0.5">
          <span className="text-red"> 2009 - </span>
          {t("bodyInvestments")}
        </p>

        <p className="m-0 mt-0.5">
          <span className="text-red"> 2006 - </span>
          {t("realUtopias")}
        </p>

        <p className="m-0 mt-4">{t("also")}</p>
      </div>
    </div>
  );
};

export default Exhibitions;
