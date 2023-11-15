import { GetStaticProps } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Meta } from "src/components/Meta";
import { getDocument } from "src/lib/getDocument";

import KarenOhanyan from "@/public/images/Karen-Ohanyan.jpg";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "meta",
        "albums",
        "images",
      ])),
      content: await getDocument("biography", ctx.locale),
    },
  };
};

interface BiographyProps {
  _?: void;
  content: string;
}

export const Biography: React.FC<BiographyProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
      <Meta />
      <h1 className="text-xl m-0 m-0 pb-5">{t("Biography")}</h1>
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
        className="py-10"
        dangerouslySetInnerHTML={{ __html: props.content }}
      ></div>
    </div>
  );
};

export default Biography;
