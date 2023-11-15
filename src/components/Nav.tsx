"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import albums from "src/data/albums.json";

import { cn } from "@/src/lib/utils";

import { AppKeyboardNavigation } from "./AppKeyboardNavigation";
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
  isLargeMode: boolean;
}

export const Nav: React.FC<NavProps> = ({ slug, pathname, isLargeMode }) => {
  const t = useTranslations();

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
          <Hamburger isLargeMode={isLargeMode} />
        </div>
        <LanguageBar currentPath={pathname} />
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
                          href={`/${album.path}/${album.images[
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
