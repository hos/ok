"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import albums from "src/data/albums.json";

import { cn } from "../lib/utils";

interface ImageListProps {
  className?: string;
  albumPath: string;
}

export const ImageList: React.FC<ImageListProps> = ({
  className,
  albumPath,
}) => {
  const locale = useLocale();
  const t = useTranslations();

  const album = albums.find((alb) => alb.path === albumPath);
  if (!album) {
    return null;
  }

  return (
    <div
      className={cn(
        `list flex flex-wrap max-w-[80%] md:max-w-[320px] my-[20px] mx-auto md:mt-20px max-md:justify-center`,
        className,
      )}
    >
      {album.images.map((image) => {
        return (
          <Link
            key={image.fileName}
            href={`/${locale}/${albumPath}/${image.fileName.replace(
              ".jpg",
              "",
            )}`}
            scroll={false}
            className="mr-1"
          >
            <Image
              width="70"
              height="70"
              className="object-cover"
              data-filename={image.fileName.replace(".jpg", "")}
              src={`/images/large/${image.fileName}`}
              alt={t(`images.${image.fileName.replace(".jpg", "")}`)}
            />
          </Link>
        );
      })}
    </div>
  );
};
