import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import React from "react";
import styled from "styled-components";

import albums from "../data/albums.json";

interface ImageListProps {
  _?: void;
}

export const ImageList: React.FC<ImageListProps> = () => {
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
    <Container className="image-list">
      {album.images.map((image) => {
        return (
          <Link
            href={`/${albumName}/${image.replace(".jpg", "")}`}
            key={image}
            scroll={false}
          >
            <a>
              <Image
                width="70"
                height="70"
                objectFit="cover"
                src={`/images/large/${image}`}
                alt={t(image)}
              />
            </a>
          </Link>
        );
      })}
    </Container>
  );
};

const Container = styled.div`
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
    margin: 0 auto;
    width: 100%;
    min-height: 150px;
  }
`;
