"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import albums from "src/data/albums.json";

import { closePages } from "../lib/closePages";
import { cn } from "../lib/utils";

const otherKeyPressed = new Map();

export const AppKeyboardNavigation = ({
  slug,
  className,
}: {
  slug: string;
  className: string;
}) => {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations();
  const [next, previous] = closePages(slug);
  // navigate only if up or down key is pressed, no other key
  const { isOpen, setIsOpen } = useActiveLink({ album: slug });

  const localePush = useCallback(
    (path: string) => {
      router.push(`/${locale}${path}`);
    },
    [router, locale],
  );

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" && otherKeyPressed.size === 0) {
        e.preventDefault();
        localePush(previous);
        return;
      }
      if (e.key === "ArrowDown" && otherKeyPressed.size === 0) {
        e.preventDefault();
        localePush(next);
        return;
      }

      otherKeyPressed.set(e.key, true);
    };

    const handleUp = (e: KeyboardEvent) => {
      otherKeyPressed.delete(e.key);
    };

    document.addEventListener("keydown", handleDown);
    document.addEventListener("keyup", handleUp);

    return () => {
      document.removeEventListener("keydown", handleDown);
      document.removeEventListener("keyup", handleUp);
    };
  }, [previous, next, localePush]);

  const handleClick = useCallback(
    () => setIsOpen((oldValue) => !oldValue),
    [setIsOpen],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("show-works-menu");
    } else {
      document.body.classList.remove("show-works-menu");
    }
  }, [isOpen]);

  return (
    <span className={cn(className, "group/works")} onClick={handleClick}>
      {t("Works")}
    </span>
  );
};

export const useActiveLink = ({ album }: { album: string }) => {
  const local = useLocale();
  const pathname = usePathname().replace(`/${local}`, "");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body")?.classList.remove("show-menu");

    // Remove 'selected' class from previous selected menu item.
    document
      .querySelector(".parent-menu a[href].selected")
      ?.classList.remove("selected");

    const isAlbum = !!(album && albums.find(({ path }) => path === album));
    setIsOpen(isAlbum);

    const elements = document.querySelectorAll(".parent-menu a[href]");
    const links: HTMLAnchorElement[] = [].slice.call(elements);

    // We want to match as specific href as possible, meaning
    // in the list of menu items if we have link to specific album
    // then we want to highlight that one. But, if we don't have that
    // link to specific article then we just want to highlight the texts
    // in menu item list. Otherwise don't highlight any item.
    const pathnameParts = pathname.split("/").slice(-2);
    while (pathnameParts.length > 0) {
      const mostSpecificLink = pathnameParts.join("/");
      const matchedLink = links.find((a) => a.href.includes(mostSpecificLink));
      if (matchedLink) {
        matchedLink.classList.add("selected");
        break;
      }
      pathnameParts.pop();
    }
  }, [pathname, album]);

  return { isOpen, setIsOpen };
};
