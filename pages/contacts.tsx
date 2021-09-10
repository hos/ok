import { GetStaticProps } from "next";
import Link from "next/link";
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

interface ContactsProps {
  _?: void;
}

export const Contacts: React.FC<ContactsProps> = () => {
  return (
    <Container>
      <Meta />

      <Link href="mailto:karenohanyan.art@gmail.com" passHref>
        <a target="_blank">google: karenohanyan.art@gmail.com</a>
      </Link>
      <Link href="https://www.facebook.com/karen.ohanyan.14" passHref>
        <a target="_blank">facebook: karen.ohanyan.14</a>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & a {
    font-size: 16px;
    font-weight: 500;
    margin: 10px;
  }
`;

export default Contacts;
