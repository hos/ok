import { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import React, { FC, PropsWithChildren } from "react";
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
      <h1 className="text-xl m-0 pb-5">{t("Solo Exhibitions")}</h1>
      <Image
        src="/images/exhibition.jpg"
        alt="Exhibitions"
        width="481"
        height="393"
        className="max-w-full h-auto object-contain object-left"
        priority
      />
      <div className="my-12 mx-2 text-base  leading-5 flex flex-col gap-2">
        <Paragraph>
          {" "}
          <RedSpan> 2026 - </RedSpan> {t("charliesDream")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2024 - </RedSpan> {t("icons")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2023 - </RedSpan> {t("visions")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2023 - </RedSpan> {t("dreamer")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2022 - </RedSpan> {t("khaltura")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2022 - </RedSpan> {t("champion")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2021 - </RedSpan> {t("sevan")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2016 - </RedSpan> {t("avantGarde")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2009 - </RedSpan> {t("bodyInvestments")}{" "}
        </Paragraph>
        <Paragraph>
          {" "}
          <RedSpan> 2006 - </RedSpan> {t("realUtopias")}{" "}
        </Paragraph>
        <p className="m-0 mt-4">{t("also")}</p>
      </div>
    </div>
  );
};

const Paragraph: FC<PropsWithChildren> = ({ children }) => <p>{children}</p>;

const RedSpan: FC<PropsWithChildren> = ({ children }) => (
  <span className="text-red">{children}</span>
);

export default Exhibitions;
