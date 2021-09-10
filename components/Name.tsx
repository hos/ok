import Link from "next/link";
import { useTranslation } from "next-i18next";
import React from "react";
import styled from "styled-components";

interface NameProps {
  _?: void;
}

export const Name: React.FC<NameProps> = () => {
  const { t } = useTranslation();
  return (
    <Container>
      <Link href="/" passHref>
        <h1>{t("Karen Ohanyan")}</h1>
      </Link>
    </Container>
  );
};

const Container = styled.div`
  white-space: nowrap;
  margin-top: 14px;
  position: relative;
  top: 0;
  font-size: 20px;
  cursor: pointer;

  & h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 100;
  }

  @media screen and (max-width: 800px) {
    & h1 {
      margin: 20px 0;
    }
  }
`;
