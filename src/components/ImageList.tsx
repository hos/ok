import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import albums from "src/data/albums.json";

import { cn } from "../lib/utils";

interface ImageListProps {
  _?: void;
  className?: string;
}

export const ImageList: React.FC<ImageListProps> = (props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [albumName] = Array.isArray(router.query.album)
    ? router.query.album
    : [];

  const album = albums.find((alb) => alb.path === albumName);

  if (!album) {
    return null;
  }

  return (
    <div
      className={cn(
        `list flex flex-wrap max-w-[80%] md:max-w-[320px] my-[20px] mx-auto md:mt-20px max-md:justify-center`,
        props.className,
      )}
    >
      {album.images.map((image) => {
        return (
          <Link
            key={image.fileName}
            href={`/${albumName}/${image.fileName.replace(".jpg", "")}`}
            scroll={false}
            className="mr-1"
          >
            <Image
              width="70"
              height="70"
              style={{ objectFit: "cover" }}
              src={`/images/large/${image.fileName}`}
              alt={t(image.fileName)}
            />
          </Link>
        );
      })}
    </div>
  );
};
