import { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";

const exhibitions = [
  ["2026", "charliesDream"],
  ["2024", "icons"],
  ["2023", "visions"],
  ["2023", "dreamer"],
  ["2022", "khaltura"],
  ["2022", "champion"],
  ["2021", "sevan"],
  ["2016", "avantGarde"],
  ["2009", "bodyInvestments"],
  ["2006", "realUtopias"],
] as const;

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/exhibitions">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return {
    title: t("exhibitions.Solo Exhibitions"),
    description: t("description"),
  };
}

const Exhibitions = async (props: PageProps<"/[locale]/exhibitions">) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations("exhibitions");
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
      <h1 className="m-0 pb-5 text-2xl leading-tight font-normal max-md:px-5">
        {t("Solo Exhibitions")}
      </h1>
      <Image
        src="/images/exhibition.jpg"
        alt="Exhibitions"
        width="481"
        height="393"
        className="max-w-full h-auto object-contain object-left"
        priority
      />
      <div className="my-12 w-full max-w-[481px] text-[15px] leading-[1.5] max-md:px-5 max-md:my-8">
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {exhibitions.map(([year, key]) => (
            <li className="grid grid-cols-[3rem_1fr] gap-x-3" key={key}>
              <time className="text-red tabular-nums">{year}</time>
              <span className="text-pretty">{t(key)}</span>
            </li>
          ))}
        </ol>
        <p className="m-0 mt-10 max-w-[26rem] text-[13px] leading-5 italic opacity-60">
          {t("also")}
        </p>
      </div>
    </div>
  );
};

export default Exhibitions;
