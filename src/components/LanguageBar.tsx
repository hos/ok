import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";

interface LanguageBarProps {
  disabled?: Array<string>;
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
          <Link
            href={router.asPath}
            locale={lang.path}
            passHref
            key={lang.path}
          >
            <a className={`red}`}>{lang.name}</a>
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

  .disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  & > span {
    margin-left: 5px;
  }

  & a {
    margin: 2px;
    color: rgb(203, 73, 73);
  }

  @media screen and (max-width: 800px) {
    margin: 20px 0;
  }
`;
