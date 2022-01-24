import Link from "next/link";
import { useRouter } from "next/router";
import * as i18next from "next-i18next";
import React, { useMemo } from "react";
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

  const disabledLangs = useMemo(() => {
    if (!router.asPath.includes("/articles")) {
      return [];
    }

    const currentPath = router.asPath.split("/")[2];

    return langs.filter(({ path }) => {
      const translation = i18next.i18n?.getResource(
        path,
        "articles",
        currentPath
      );
      if (!translation) {
        return true;
      }
      return false;
    });
  }, [router]);

  return (
    <Container>
      {langs.map((lang) => {
        const disabled =
          disabledLangs.findIndex((p) => p.path === lang.path) > -1;
        return (
          <Link
            href={router.asPath}
            locale={disabled ? router.locale : lang.path}
            passHref
            key={lang.path}
          >
            <a className={`red ${disabled ? "disabled" : ""}`}>{lang.name}</a>
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
