import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect, useMemo } from "react";
import { Person, VisualArtwork } from "schema-dts";
import styled from "styled-components";

import { Block } from "../components/Block";
import { CenterView } from "../components/CenterView";
import { ImageContainer } from "../components/ImageContainer";
import { Meta } from "../components/Meta";
import albums from "../data/albums.json";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "images",
        "meta",
        "albums",
      ])),
    },
  };
};

interface ImagePageProps {
  _?: void;
}

const useAround = (image: string, album?: typeof albums[0] | null) => {
  const next = useMemo(() => {
    if (!album) {
      return [null, null];
    }
    const idx = album.images.findIndex(
      (img) => img.fileName === image + ".jpg"
    );
    return (album.images[idx + 1] || album.images[0]).fileName;
  }, [album, image]);

  const previous = useMemo(() => {
    if (!album) {
      return null;
    }
    const idx = album.images.findIndex(
      (img) => img.fileName === image + ".jpg"
    );
    return (album.images[idx - 1] || album.images[album.images.length - 1])
      .fileName;
  }, [album, image]);

  return [
    `/${album?.path}/${(next + "").replace(".jpg", "")}`,
    `/${album?.path}/${(previous + "").replace(".jpg", "")}`,
  ];
};

export const ImagePage: React.FC<ImagePageProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [albumName, imageName] = Array.isArray(router.query.album)
    ? router.query.album
    : [];

  const album = albums.find((album) => album.path === albumName);

  const [next, previous] = useAround(imageName, album);

  const karen: Person = {
    "@type": "Person",
    name: t("Karen Ohanyan") || "Karen Ohanyan",
  };

  const schema: VisualArtwork = {
    "@type": "VisualArtwork",
    name: t(`images:${imageName}`),
    copyrightHolder: karen,
    artist: karen,
    artform: album?.artform,
  };

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        router.push(previous);
      }
      if (e.key === "ArrowRight") {
        router.push(next);
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [router, previous, next]);

  const image = album?.images.find(
    (img) => img.fileName === imageName + ".jpg"
  );

  if (!image) {
    return null;
  }

  return (
    <CenterView>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <Meta
        title={`${t("Karen Ohanyan")} - ${t(`images:${image.fileName}`)}`}
        description={t("description")}
      />
      <ImageContainer>
        <Link href={`${previous}`} passHref>
          <Arrow>{"◁"}</Arrow>
        </Link>
        <Block>
          <Image
            layout="responsive"
            width="800"
            height="500"
            objectFit="contain"
            src={`/images/large/${image.fileName}`}
            alt={t(image.fileName)}
          />
          <Title>{t(`images:${image.fileName}`)}</Title>
          <Desc>{` - ${image.description}`}</Desc>
        </Block>
        <Link href={`${next}`} passHref>
          <Arrow right>{"◁"}</Arrow>
        </Link>
      </ImageContainer>
    </CenterView>
  );
};

interface ArrowProps {
  right?: boolean;
}

const Arrow = styled.a<ArrowProps>`
  width: 60px;
  cursor: pointer;
  transform: rotateY(${(props) => (props.right ? "180deg" : "none")});
`;

const Title = styled.span`
  font-size: 11px;
`;

const Desc = styled.span`
  font-size: 11px;
  color: #444;
`;

export default ImagePage;
