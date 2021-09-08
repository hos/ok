import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface LanguageBarProps {
  _?: void;
}

const langs = [
  { path: "hy", name: "հայ" },
  { path: "en", name: "eng" },
  { path: "ru", name: "рус" },
];

export const LanguageBar: React.FC<LanguageBarProps> = () => {
  const router = useRouter();

  return (
    <Container>
      {langs.map((lang) => {
        return (
          <Link href={`/${lang.path}${router.asPath}`} passHref key={lang.path}>
            <a className="red">{lang.name}</a>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  font-size: 10px;
  text-transform: uppercase;
  padding-top: 20px;

  & > span {
    margin-left: 5px;
  }

  & a {
    margin: 2px;
  }

  @media screen and (max-width: 800px) {
    margin: 20px;
  }
`;
