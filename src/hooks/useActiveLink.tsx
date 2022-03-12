import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import albums from "src/data/albums.json";

export const useActiveLink = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body")?.classList.remove("show-menu");

    // Remove 'selected' class from previous selected menu item.
    document
      .querySelector(".parent-menu a[href].selected")
      ?.classList.remove("selected");

    const album = router.query.album?.[0];
    const isAlbum = !!(album && albums.find(({ path }) => path === album));
    setIsOpen(isAlbum);

    const elements = document.querySelectorAll(".parent-menu a[href]");
    const links: HTMLAnchorElement[] = [].slice.call(elements);

    // We want to match as specific href as possible, meaning
    // in the list of menu items if we have link to specific album
    // then we want to highlight that one. But, if we don't have that
    // link to specific article then we just want to highlight the articles
    // in menu item list. Otherwise don't highlight any item.
    const pathnameParts = router.asPath.split("/");
    while (pathnameParts.length > 0) {
      const mostSpecificLink = pathnameParts.join("/");
      const matchedLink = links.find((a) => a.href.includes(mostSpecificLink));
      if (matchedLink) {
        matchedLink.classList.add("selected");
        break;
      }
      pathnameParts.pop();
    }
  }, [router]);

  return { isOpen, setIsOpen };
};
