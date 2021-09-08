import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

import albums from "../data/albums.json";
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

  const [album, setAlbum] = useState<typeof albums[0]>();
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = useCallback(() => {
    document.querySelector("nav")?.classList.toggle("show-menu");
  }, []);

  useEffect(() => {
    const matchAlbum = albums.find(
      (album) => album.path === router.query.album?.[0]
    );
    if (matchAlbum?.path !== album?.path) {
      setAlbum(matchAlbum);
      setIsOpen(!!matchAlbum);
    }

    const links: HTMLAnchorElement[] = [].slice
      .call(document.querySelectorAll(".parent-menu a[href]"))
      .reverse();

    for (const link of links) {
      link.classList.remove("selected");
    }

    const currentItem = links.find(function (a) {
      const currentHref = a.href.replace(
        /^[a-z]{4}:\/{2}[a-z]{1,}:[0-9]{1,4}.(.*)/,
        "$1"
      );
      const match =
        currentHref.match(/20\d{2}/)?.toString() || currentHref.toString();
      return window.location.href.indexOf(match) !== -1;
    });

    return (currentItem || links.reverse().shift())?.classList.add("selected");
  }, [router, album]);

  return (
    <Container className={props.className}>
      <Hamburger onClick={openMenu} />
      <Nav>
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

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  text-align: left;
  display: inline-block;
  margin-left: 16px;
  z-index: 10;
  overflow: visible;

  & ul {
    list-style-type: none;
  }

  .show-menu {
    background-color: #fff !important;
    left: 0 !important;
    opacity: 1 !important;
  }

  .show-menu:after {
    content: " " !important;
    box-shadow: 0 0 5px #000 !important;
  }

  @media screen and (max-width: 800px) {
    margin-left: 0;
    background-color: transparent;
    transition: all 0.2s;
    position: fixed;
    padding: 30px;
    padding-top: 0;
    left: -100px;
    bottom: 0;
    top: 30px;
    opacity: 0;
  }
`;

const Container = styled.div`
  flex-grow: 1;

  @media screen and (max-width: 800px) {
    position: absolute;
  }
`;
