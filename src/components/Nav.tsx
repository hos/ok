"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import albums from "src/data/albums.json";

import { cn } from "@/src/lib/utils";

import { AppKeyboardNavigation } from "./AppKeyboardNavigation";
import { Hamburger } from "./Hamburger";
import { ImageList } from "./ImageList";
import { LanguageBar } from "./LanguageBar";

const urlsAndLabels = [
  { url: "/", label: "Home" },
  { url: "/works", label: "Works" },
  { url: "/exhibitions", label: "Exhibitions" },
  { url: "/texts", label: "Texts" },
  { url: "/media", label: "Media" },
  { url: "/biography", label: "Biography" },
  { url: "/contacts", label: "Contacts" },
];

interface NavProps {
  slug: string;
  pathname: string;
  isLargeMode: boolean;
}

export const Nav: React.FC<NavProps> = ({ slug, pathname, isLargeMode }) => {
  const t = useTranslations();
  const locale = useLocale();

  const linkClassName = `text-xs p-[1px] text-black no-underline cursor-pointer hover:bg-red hover:text-white [&.selected]:bg-black [&.selected]:text-white leading-5`;

  return (
    <div id="nav" className={cn("grow max-md:absolute")}>
      <div
        className="w-screen h-screen hidden max-md:[.show-menu_&]:block"
        onClick={() => {
          // When clicking outside of the menu, close it.
          document.querySelector("body")?.classList.remove("show-menu");
        }}
      ></div>
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
      max-md:[.show-menu_&]:shadow-2xl
      max-md:[.show-menu_&]:left-0
      overflow-scroll
      `}
      >
        <div>
          <Hamburger isLargeMode={isLargeMode} />
        </div>
        <LanguageBar currentPath={pathname} />
        <div className="whitespace-nowrap mt-3.5 relative top-0 cursor-pointer">
          <Link href={`/${locale || ""}`} passHref>
            <h1 className="text-2xl m-0 font-thin">{t("Karen Ohanyan")}</h1>
          </Link>
        </div>
        <br />
        <ul className="parent-menu m-0 p-0 list-none">
          {urlsAndLabels.map(({ url, label }) => {
            if (label !== "Works") {
              return (
                <li key={label}>
                  <Link href={`/${locale}/${url}`} className={linkClassName}>
                    {t(label)}
                  </Link>
                </li>
              );
            }

            return (
              <li key={label}>
                <AppKeyboardNavigation className={linkClassName} slug={slug} />
                <ul
                  className={cn(
                    `m-0 p-0 list-none hidden [.show-works-menu_&]:block`,
                  )}
                >
                  {albums.map((album) => {
                    return (
                      <li key={album.name} className="p-0 pl-[10px]">
                        <Link
                          scroll={false}
                          href={`/${locale}/${album.path}/${album.images[
                            album.default || 0
                          ].fileName.replace(".jpg", "")}`}
                          passHref
                          className={linkClassName}
                        >
                          {t(`albums.${album.path}`)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
        <ImageList className="max-md:hidden" albumPath={slug} />
      </div>
    </div>
  );
};
