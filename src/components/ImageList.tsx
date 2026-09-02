"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import albums from "src/data/albums.json";

import { cn } from "../lib/utils";

interface ImageListProps {
  className?: string;
}

export const ImageList: React.FC<ImageListProps> = ({ className }) => {
  const { album: albumPath } = useParams();
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
        const extRemovedFileName = image.fileName.replace(/\.[^/.]+$/, "");
        return (
          <Link
            key={image.fileName}
            href={`/${locale}/${albumPath}/${extRemovedFileName}`}
            scroll={false}
            className="mt-1 mr-1 flex justify-center"
          >
            <Image
              width="70"
              height="70"
              className="object-contain opacity-0 transition-opacity duration-500 data-[loaded=true]:opacity-100"
              data-filename={extRemovedFileName}
              src={`/images/large/${image.fileName}`}
              alt={t(`images.${extRemovedFileName}`)}
              onLoad={(e) =>
                e.currentTarget.setAttribute("data-loaded", "true")
              }
            />
          </Link>
        );
      })}
    </div>
  );
};
