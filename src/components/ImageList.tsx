import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import albums from "src/data/albums.json";
import styled from "styled-components";

interface ImageListProps {
  _?: void;
  className?: string;
}

const _ImageList: React.FC<ImageListProps> = (props) => {
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
    <div className={`list ${props.className}`}>
      {album.images.map((image) => {
        return (
          <Link
            href={`/${albumName}/${image.fileName.replace(".jpg", "")}`}
            key={image.fileName}
            scroll={false}
          >
            <Image
              width="70"
              height="70"
              objectFit="cover"
              src={`/images/large/${image.fileName}`}
              alt={t(image.fileName)}
            />
          </Link>
        );
      })}
    </div>
  );
};

export const ImageList = styled(_ImageList)`
  display: flex;
  flex-wrap: wrap;
  max-width: 320px;
  text-align: center;
  margin-top: 20px;

  & a {
    margin-right: 4px;
  }

  @media screen and (max-width: 800px) {
    max-width: 80%;
    margin: 20px auto;
    width: 100%;
    justify-content: center;
  }
`;
