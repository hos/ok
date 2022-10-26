import { GetStaticProps } from "next";
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { CenterView } from "src/components/CenterView";
import { Meta } from "src/components/Meta";
import { Text } from "src/components/Text";
import { Title } from "src/components/Title";
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
    <CenterView text>
      <Meta />
      <Title>{t("Biography")}</Title>
      <Image
        src={KarenOhanyan}
        alt="Karen Ohanyan Portrait"
        objectFit="contain"
        objectPosition="left"
      />

      <Text dangerouslySetInnerHTML={{ __html: props.content }}></Text>
    </CenterView>
  );
};

export default Biography;
