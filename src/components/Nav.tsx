import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useRef } from "react";
import albums from "src/data/albums.json";
import { useActiveLink } from "src/hooks/useActiveLink";
import { usePageNav } from "src/hooks/usePageNav";
import styled from "styled-components";

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
  const otherKeyPressed = useRef<Map<string, boolean>>(new Map());

  const toggleMenu = useCallback(() => {
    document.querySelector("body")?.classList.toggle("show-menu");
  }, []);

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && otherKeyPressed.current.size === 0) {
        e.preventDefault();
        router.push(previous);
        return;
      }
      if (e.key === "ArrowDown" && otherKeyPressed.current.size === 0) {
        e.preventDefault();
        router.push(next);
        return;
      }

      otherKeyPressed.current.set(e.key, true);
    };

    const handleUp = (e: KeyboardEvent) => {
      otherKeyPressed.current.delete(e.key);
    };

    document.addEventListener("keydown", handleDown);
    document.addEventListener("keyup", handleUp);

    return () => {
      document.removeEventListener("keydown", handleDown);
      document.removeEventListener("keyup", handleUp);
    };
  }, [otherKeyPressed, router, previous, next]);

  return (
    <Container className={props.className}>
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
    left: 0;
    max-width: 400px;
    background-color: #fff;
    border-right: 0.5px solid #eee;
    box-shadow: 10px 10px 200px #333;
  }

  .show-menu &:after {
    content: " ";
    box-shadow: 0 0 5px #000;
  }

  @media screen and (max-width: 800px) {
    height: 100vh;
    margin-left: 0;
    background-color: transparent;
    transition: all 0.2s;
    position: fixed;
    padding: 30px;
    padding-top: 20px;
    left: -500px;
    bottom: 0;
    top: 0;
    & ${ImageList} {
      display: none;
      position: absolute;
    }
  }
`;
