"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

import { albumNavPages } from "../lib/albumNavPages";

export const AlbumKeyboardNavigation = ({
  imageName,
  album,
}: {
  imageName: string;
  album: any;
}) => {
  const router = useRouter();
  const params = useParams();

  const isLargeMode = params?.mode === "large";

  const [next, previous] = albumNavPages(imageName, isLargeMode, album);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && previous) {
        router.push(previous);
      }
      if (e.key === "ArrowRight" && next) {
        router.push(next);
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [isLargeMode, router, previous, next]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLargeMode) {
        const url = new URL(location.href);
        url.search = "";
        router.push(url.toString());
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [isLargeMode, router, previous, next]);

  return null;
};
