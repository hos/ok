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
  const { isOpen, setIsOpen } = useActiveLink({ part: slug });

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

export const useActiveLink = ({ part }: { part: string }) => {
  const local = useLocale();
  const pathname = usePathname().replace(`/${local}`, "");

  // Derived from the route rather than read back off the rendered menu, so the
  // sub-menu's open state does not depend on an effect having run first.
  const isAlbumPath = !!(
    part && albums.some(({ path }) => pathname.includes(path))
  );

  const [isOpen, setIsOpen] = useState(isAlbumPath);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Navigating re-derives the open state; clicking "Works" is free to override
  // it until the next navigation.
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setIsOpen(isAlbumPath);
  }

  useEffect(() => {
    document.querySelector("body")?.classList.remove("show-menu");

    // Remove 'selected' class from previous selected menu item.
    document
      .querySelector(".parent-menu a[href].selected")
      ?.classList.remove("selected");

    const elements = document.querySelectorAll(".parent-menu a[href]");
    const links: HTMLAnchorElement[] = [].slice.call(elements);

    // start with the longest to match as specific href as possible
    links.sort((a, b) => b.href.length - a.href.length);

    const matched = links.find((a) =>
      pathname.includes(String(a.dataset.match)),
    );

    matched?.classList.add("selected");
  }, [pathname]);

  return { isOpen, setIsOpen };
};
