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
    const idx = album.images.findIndex((img) => img === image + ".jpg");
    return album.images[idx + 1] || album.images[0];
  }, [album, image]);

  const previous = useMemo(() => {
    if (!album) {
      return null;
    }
    const idx = album.images.findIndex((img) => img === image + ".jpg");
    return album.images[idx - 1] || album.images[album.images.length - 1];
  }, [album, image]);

  return [
    `/${album?.path}/${(next + "").replace(".jpg", "")}`,
    `/${album?.path}/${(previous + "").replace(".jpg", "")}`,
  ];
};

export const ImagePage: React.FC<ImagePageProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const [albumName, image] = Array.isArray(router.query.album)
    ? router.query.album
    : [];

  const album = albums.find((album) => album.path === albumName);

  const [next, previous] = useAround(image, album);

  const karen: Person = {
    "@type": "Person",
    name: t("Karen Ohanyan") || "Karen Ohanyan",
  };

  const schema: VisualArtwork = {
    "@type": "VisualArtwork",
    name: t(`images:${image}`),
    copyrightHolder: karen,
    artist: karen,
    artform: album?.artform,
  };

  // componentWillMount deprecated in React 16.3
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

  return (
    <CenterView>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <Meta
        title={`${t("Karen Ohanyan")} - ${t(`images:${image}`)}`}
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
            src={`/images/large/${image + ".jpg"}`}
            alt={t(image)}
          />
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

export default ImagePage;
