import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import albums from "src/data/albums.json";
import { useActiveLink } from "src/hooks/useActiveLink";
import { usePageNav } from "src/hooks/usePageNav";

import { cn } from "@/src/lib/utils";

import { Hamburger } from "./Hamburger";
import { ImageList } from "./ImageList";
import { LanguageBar } from "./LanguageBar";

const urlsAndLabels = [
  { url: "/", label: "Home" },
  { url: "/works", label: "Works" },
  { url: "/articles", label: "Articles" },
  { url: "/biography", label: "Biography" },
  { url: "/exhibitions", label: "Exhibitions" },
  { url: "/contacts", label: "Contacts" },
];

interface NavProps {
  slug: string;
  pathname: string;
  navigate: (_url: string) => void;
  t: (_key: string) => string;
}

export const Menu: React.FC<NavProps> = ({ t, slug, pathname, navigate }) => {
  const { isOpen, setIsOpen } = useActiveLink({ pathname, album: slug });

  const [next, previous] = usePageNav(slug);
  // navigate only if up or down key is pressed, no other key
  const otherKeyPressed = useRef<Map<string, boolean>>(new Map());

  const toggleMenu = useCallback(() => {
    document.querySelector("body")?.classList.toggle("show-menu");
  }, []);

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && otherKeyPressed.current.size === 0) {
        e.preventDefault();
        navigate(previous);
        return;
      }
      if (e.key === "ArrowDown" && otherKeyPressed.current.size === 0) {
        e.preventDefault();
        navigate(next);
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
  }, [otherKeyPressed, navigate, previous, next]);

  const linkClassName = `text-xs p-[1px] text-black no-underline cursor-pointer hover:bg-red hover:text-white [&.selected]:bg-black [&.selected]:text-white leading-5`;

  return (
    <div className="grow max-md:absolute">
      <div
        className={`inline-block max-md:h-full m-0 md:m-4 bg-white md:bg-transparent max-w-95
      max-md:z-10
      max-md:duration-300
      max-md:ease-in
      max-md:fixed
      max-md:p-8
      max-md:pt-5
      max-md:-left-96
      max-md:inset-y-0
      [.show-menu_&]:shadow-2xl
      [.show-menu_&]:left-0
      `}
      >
        <div>
          <Hamburger onClick={() => toggleMenu()} />
        </div>
        <LanguageBar />
        <div className="whitespace-nowrap mt-3.5 relative top-0 cursor-pointer">
          <Link href="/" passHref>
            <h1 className="text-2xl m-0 font-thin">{t("Karen Ohanyan")}</h1>
          </Link>
        </div>
        <br />
        <ul className="parent-menu m-0 p-0 list-none">
          {urlsAndLabels.map(({ url, label }) => {
            if (label !== "Works") {
              return (
                <li key={label}>
                  <Link href={url} className={linkClassName}>
                    {t(label)}
                  </Link>
                </li>
              );
            }

            return (
              <li key={label}>
                <span
                  className={linkClassName}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {t(label)}
                </span>
                <ul
                  className={cn(
                    `submenu m-0 p-0 list-none ${isOpen ? "" : "hidden"}`,
                  )}
                >
                  {albums.map((album) => {
                    return (
                      <li key={album.name} className="p-0 pl-[10px]">
                        <Link
                          scroll={false}
                          href={`/${album.path}/${album.images[
                            album.default || 0
                          ].fileName.replace(".jpg", "")}`}
                          passHref
                          className={linkClassName}
                        >
                          {t(`albums:${album.path}`)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <ImageList className="max-md:hidden" />
      </div>
    </div>
  );
};
