import { GetStaticProps } from "next";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { CenterView } from "src/components/CenterView";
import { Meta } from "src/components/Meta";
import articles from "src/data/articles.json";
import styled from "styled-components";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "meta",
        "albums",
        "articles",
        "articles-desc",
      ])),
    },
  };
};

interface ArticlesProps {
  _?: void;
  contents: Record<string, string>;
}

export const Articles: React.FC<ArticlesProps> = () => {
  const { t } = useTranslation("articles");

  return (
    <CenterView text>
      <Meta />

      <Container>
        {Object.entries(articles).map(([key, value]) => {
          return (
            <Link href={`/articles/${key}`} key={key} passHref>
              <a>
                <RedTitle>{t(key)}</RedTitle>
                <p>
                  {t(`${value.author}`)} / {value.year || 0}
                </p>
                <p>{t(`articles-desc:${key}`)}</p>
              </a>
            </Link>
          );
        })}
      </Container>
    </CenterView>
  );
};

const RedTitle = styled.h4`
  color: rgb(203, 73, 73);
`;

const Container = styled.div`
  max-width: 600px;
  padding-bottom: 100px;
  margin: auto;
  ${RedTitle} {
    font-weight: 500;
  }
  p {
    font-size: 14px;
  }

  p + p {
    font-size: 12px;
  }
`;

export default Articles;
