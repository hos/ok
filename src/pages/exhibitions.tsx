import { GetStaticProps } from "next";
import Image from "next/legacy/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { CenterView } from "src/components/CenterView";
import { Meta } from "src/components/Meta";
import { Text } from "src/components/Text";
import { Title } from "src/components/Title";
import styled from "styled-components";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "images",
        "meta",
        "albums",
        "exhibitions",
      ])),
    },
  };
};

interface ExhibitionsProps {
  _?: void;
}

const ExText = styled(Text)`
  font-size: 12.5px;
  line-height: 19px;
`;

export const Exhibitions: React.FC<ExhibitionsProps> = () => {
  const { t } = useTranslation("exhibitions");
  return (
    <CenterView text>
      <Meta />
      <Title>Solo Exhibitions</Title>
      <Image
        src="/images/exhibition.jpg"
        alt="Exhibitions"
        width="481"
        height="393"
        objectFit="contain"
        objectPosition="left"
      />
      <ExText>
        <Red> 2023 - </Red>
        <span>{t("studio20")}</span>
        <br />
        <Red> 2021 - </Red>
        <span>{t("sevan")}</span>
        <br />
        <Red> 2016 - </Red>
        <span>{t("avantGarde")}</span>
        <br />
        <Red> 2009 - </Red>
        <span>{t("bodyInvestments")}</span>
        <br />
        <Red> 2006 - </Red>
        <span>{t("realUtopias")}</span>
        <br />
        <br />
        <span>{t("also")}</span>
      </ExText>
    </CenterView>
  );
};

const Red = styled.span`
  color: rgb(203, 73, 73);
`;

export default Exhibitions;
