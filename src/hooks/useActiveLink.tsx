import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import albums from "src/data/albums.json";

export const useActiveLink = () => {
  const router = useRouter();
  const [album, setAlbum] = useState<typeof albums[0]>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.querySelector("body")?.classList.remove("show-menu");

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

  return { isOpen, setIsOpen };
};
