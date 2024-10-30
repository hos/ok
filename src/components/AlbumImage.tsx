"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "../lib/utils";
import { CarouselItem, useCarousel } from "./ui/carousel";
import albums from "src/data/albums.json";

export const UpdateUrlWithCarousel = ({
  images,
  album,
  large,
  setTitle,
  setDescription,
}: {
  images: { fileName: string; description?: string }[];
  album: string;
  large?: boolean;
  setTitle: (_val: any) => void;
  setDescription: (_val: any) => void;
}) => {
  const carousel = useCarousel();
  const locale = useLocale();
  const t = useTranslations();
  const onSelect = useCallback(() => {
    const index = carousel.api?.selectedScrollSnap();

    const img = images.at(index || -1);

    if (img === undefined) {
      return;
    }

    const newUrl = `/${locale}/${album}/${img?.fileName.split(".jpg")[0]}${
      large ? "?mode=large" : ""
    }`;

    window.history.pushState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl,
    );

    // If we use router.push next.js will rerender the page which will cause the animation to stop,
    // so instead we use this workaround to update url and title manually...
    const title = img?.fileName.split(".jpg")[0];
    const titleLocalized = t(`images.${title}`);
    setTitle?.(titleLocalized);
    setDescription?.(img?.description);
  }, [locale, album, large, carousel, images, setTitle, t, setDescription]);

  useEffect(() => {
    if (!carousel?.api) {
      return;
    }

    const { api } = carousel;

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [carousel, onSelect]);

  return null;
};

export const AlbumImage = ({
  index,
  image,
  className,
  imageClassName,
}: {
  index?: number;
  image: { fileName: string; description: string };
  className?: string;
  imageClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { api } = useCarousel();

  const src = `/images/large/${image.fileName}`;
  const fileNameNoExt = image.fileName.replace(".jpg", "");
  const imageNameLocalized = t(`images.${fileNameNoExt}`);

  const album = albums.find((album) =>
    album.images.some((img) => img.fileName === image.fileName),
  );
  const zoom = album?.zoom || 1;

  return (
    <CarouselItem className={cn("relative", className)} ref={ref}>
      <Link
        href={{ query: { mode: "large" } }}
        shallow
        className={cn("cursor-pointer", className)}
      >
        <Image
          priority={index === api?.selectedScrollSnap()}
          quality={100}
          width="800"
          height="500"
          src={src}
          alt={imageNameLocalized}
          data-filename={fileNameNoExt}
          style={{ objectFit: "contain", transform: `scale(${zoom})` }}
          className={imageClassName}
        />
      </Link>
    </CarouselItem>
  );
};
