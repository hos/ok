"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "../lib/utils";
import { CarouselItem, useCarousel } from "./ui/carousel";

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

    const extRemovedFileName = img.fileName.replace(/\.[^/.]+$/, "");
    const newUrl = `/${locale}/${album}/${extRemovedFileName}${large ? "?mode=large" : ""}`;

    window.history.pushState(
      { ...window.history.state, as: newUrl, url: newUrl },
      "",
      newUrl,
    );

    // If we use router.push next.js will rerender the page which will cause the animation to stop,
    // so instead we use this workaround to update url and title manually...
    const title = extRemovedFileName;
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
  zoomOut,
}: {
  scale?: number;
  index?: number;
  image: { fileName: string; description: string };
  className?: string;
  zoomOut?: boolean;
  imageClassName?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const { api } = useCarousel();
  const [loaded, setLoaded] = useState(false);

  const src = `/images/large/${image.fileName}`;
  const fileNameNoExt = image.fileName.replace(/\.[^/.]+$/, "");
  const imageNameLocalized = t(`images.${fileNameNoExt}`);
  const isPriority = index === api?.selectedScrollSnap();

  return (
    <CarouselItem className={cn("relative", className)} ref={ref}>
      <Link
        href={{ query: { mode: "large" } }}
        shallow
        className={cn("cursor-pointer", className)}
      >
        <Image
          priority={isPriority}
          quality={75}
          width="800"
          height="500"
          src={src}
          alt={imageNameLocalized}
          data-filename={fileNameNoExt}
          style={{ objectFit: "contain" }}
          onLoad={() => setLoaded(true)}
          className={cn(
            imageClassName,
            zoomOut ? "scale-75" : "",
            !isPriority &&
              cn(
                "transition-opacity duration-500",
                loaded ? "opacity-100" : "opacity-0",
              ),
          )}
        />
      </Link>
    </CarouselItem>
  );
};
