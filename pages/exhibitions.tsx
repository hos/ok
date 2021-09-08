import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import styled from "styled-components";

import { Meta } from "../components/Meta";

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
  return (
    <Container>
      <Meta />
    </Container>
  );
};

const Container = styled.div``;

export default Exhibitions;
