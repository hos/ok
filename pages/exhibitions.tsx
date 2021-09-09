import { GetStaticProps } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import styled from "styled-components";

import { Meta } from "../components/Meta";
import { Title } from "../components/Title";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "images",
        "meta",
        "albums",
      ])),
    },
  };
};

interface ExhibitionsProps {
  _?: void;
}

export const Exhibitions: React.FC<ExhibitionsProps> = () => {
  const { t } = useTranslation();
  return (
    <Container>
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
      <Text>
        <Red> 2021 - </Red>
        <span>
          {t('"Sevan" Cafesjian Center for the Arts (Yerevan, Armenia)')}
        </span>
        <br />
        <Red> 2016 - </Red>
        <span>
          {t(
            '"From Avant-garde to Avant-garde" Sargis Muradyan gallery (Yerevan, Armenia)'
          )}
        </span>
        <br />
        <Red> 2009 - </Red>
        <span>{t('"Body Investments" ACCEA (Yerevan, Armenia)')}</span>
        <br />
        <Red> 2006 - </Red>
        <span>{t('"Real Utopias" ACCEA (Yerevan, Armenia)')}</span>
        <br />
        <br />
        <span>
          {t(
            "Karen Ohanyan took part in many collective exhibitions, as well."
          )}
        </span>
      </Text>
    </Container>
  );
};

const Text = styled.div`
  padding-top: 40px;
`;

const Red = styled.span`
  color: rgb(203, 73, 73);
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
  text-align: left;
  font-size: 12.5px;
  line-height: 19px;

  & > div {
    margin: 0 auto;
    display: inline-block;
    text-align: left;
    line-height: 20px;
  }

  img {
    width: 80%;
  }
`;

export default Exhibitions;
