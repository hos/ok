import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect } from "react";
import styled from "styled-components";

import albums from "../data/albums.json";
import { useActiveLink } from "../hooks/useActiveLink";
import { usePageNav } from "../hooks/usePageNav";
import { Hamburger } from "./Hamburger";
import { ImageList } from "./ImageList";
import { LanguageBar } from "./LanguageBar";
import { Li, Ul } from "./ListItem";
import { Name } from "./Name";

interface NavProps {
  className?: string;
}

export const Menu: React.FC<NavProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();

  const { isOpen, setIsOpen } = useActiveLink();

  const [next, previous] = usePageNav();

  const toggleMenu = useCallback(() => {
    document.querySelector("body")?.classList.toggle("show-menu");
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        router.push(previous);
      }
      if (e.key === "ArrowDown") {
        router.push(next);
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [router, previous, next]);

  return (
    <Container className={props.className}>
      <Hamburger onClick={() => toggleMenu()} />
      <Nav>
        <div>
          <Hamburger onClick={() => toggleMenu()} />
        </div>
        <LanguageBar />
        <Name />
        <br />
        <Ul className="parent-menu">
          <Li>
            <Link href="/">{t("Home")}</Link>
          </Li>
          <Li id="works-submenu" className={isOpen ? `` : "hidden"}>
            <a onClick={() => setIsOpen(!isOpen)}>{t("Works")}</a>
            <Ul className="submenu">
              {albums.map((album) => {
                return (
                  <Li key={album.name}>
                    <Link
                      scroll={false}
                      href={`/${album.path}/${album.images[
                        album.default || 0
                      ].fileName.replace(".jpg", "")}`}
                      passHref
                    >
                      <a className={"work"}>{t(`albums:${album.path}`)}</a>
                    </Link>
                  </Li>
                );
              })}
            </Ul>
          </Li>
          <Li>
            <Link href="/articles">{t("Articles")}</Link>
          </Li>
          <Li>
            <Link href="/biography">{t("Biography")}</Link>
          </Li>
          <Li>
            <Link href="/exhibitions">{t("Exhibitions")}</Link>
          </Li>
          <Li>
            <Link href="/contacts">{t("Contacts")}</Link>
          </Li>
        </Ul>
        <ImageList />
      </Nav>
    </Container>
  );
};

const Container = styled.div`
  flex-grow: 1;

  @media screen and (max-width: 800px) {
    position: absolute;
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 250px;
  display: inline-block;
  margin-left: 16px;
  z-index: 2;
  overflow: visible;

  & ul {
    list-style-type: none;
  }

  .show-menu & {
    background-color: #fff;
    left: 0;
    border-right: 0.5px solid #eee;
  }

  .show-menu &:after {
    content: " " !important;
    box-shadow: 0 0 5px #000 !important;
  }

  @media screen and (max-width: 800px) {
    height: 100vh;
    margin-left: 0;
    background-color: transparent;
    transition: all 0.2s;
    position: fixed;
    padding: 30px;
    padding-top: 0;
    left: -500px;
    bottom: 0;

    & ${ImageList} {
      display: none;
      position: absolute;
    }

    ${Hamburger} {
      margin-left: 0;
    }
  }
`;
