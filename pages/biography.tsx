import { GetStaticProps } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { CenterView } from "../components/CenterView";
import { Meta } from "../components/Meta";
import { Text } from "../components/Text";
import { Title } from "../components/Title";
import { getDocument } from "../lib/getDocument";

export const getServerSideProps: GetStaticProps = async (ctx) => {
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
        src="/images/Karen-Ohanyan.jpg"
        alt="Exhibitions"
        width="481"
        height="393"
        objectFit="contain"
        objectPosition="left"
      />

      <Text dangerouslySetInnerHTML={{ __html: props.content }}></Text>
    </CenterView>
  );
};

export default Biography;
