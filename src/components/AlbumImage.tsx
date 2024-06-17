"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "../lib/utils";
import { CarouselItem, useCarousel } from "./ui/carousel";

export const UpdateUrlWithCarousel = ({
  images,
  album,
  large,
}: {
  images: { fileName: string }[];
  album: string;
  large?: boolean;
}) => {
  const carousel = useCarousel();
  const locale = useLocale();

  const onSelect = useCallback(() => {
    const index = carousel.api?.selectedScrollSnap();

    const img = images.at(index || -1);

    if (img === undefined) {
      return;
    }

    window.history.pushState(
      {},
      "",
      `/${locale}/${album}/${img?.fileName.split(".jpg")[0]}${large ? "?mode=large" : ""}`,
    );
  }, [locale, album, large, carousel, images]);

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
          style={{ objectFit: "contain" }}
          className={imageClassName}
        />
      </Link>
    </CarouselItem>
  );
};
