import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { VisualArtwork } from "schema-dts";
import styled from "styled-components";

import { ImageBlock } from "../components/Block";
import { CenterView } from "../components/CenterView";
import { ImageContainer } from "../components/ImageContainer";
import { ImageList } from "../components/ImageList";
import { Meta } from "../components/Meta";
import albums from "../data/albums.json";
import { useAlbumNav } from "../hooks/useAlbumNav";
import { useShortcut } from "../hooks/useShortcut";
import Images from "../lib/images";
import { useLD } from "../lib/ld";
import { i18n } from "../next-i18next.config";

type ImageName = keyof typeof Images;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = [];

  for (const album of albums) {
    for (const img of album.images) {
      paths.push(`/${album.path}/${img.fileName.replace(".jpg", "")}`);
      for (const locale of i18n?.locales || []) {
        paths.push(
          `/${locale}/${album.path}/${img.fileName.replace(".jpg", "")}`
        );
      }
    }
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
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

export const ImagePage: React.FC<ImagePageProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { karen } = useLD();
  const [albumName, imageName] = Array.isArray(router.query.album)
    ? router.query.album
    : [];

  const album = albums.find((album) => album.path === albumName);

  const [next, previous] = useAlbumNav(imageName, album);

  const schema: VisualArtwork = {
    "@type": "VisualArtwork",
    name: t(`images:${imageName}`),
    copyrightHolder: karen,
    artist: karen,
    artform: album?.artform,
  };

  useShortcut();

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        router.push(previous, undefined, { shallow: true });
      }
      if (e.key === "ArrowRight") {
        router.push(next, undefined, { shallow: true });
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
      <Meta
        title={`${t("Karen Ohanyan")} - ${t(`images:${image.fileName}`)}`}
        description={image.description || t("description")}
        imageURL={`/images/large/${image.fileName}`}
        imageAlt={t(`images:${image.fileName}`)}
      />
      {/* className "album" can be used with shortcuts */}
      <Container className="album">
        <ImageContainer>
          <Link href={`${previous}`} passHref shallow>
            <Arrow>{"◁"}</Arrow>
          </Link>
          <ImageBlock>
            <Image
              priority
              objectFit="contain"
              src={Images[image.fileName as ImageName]}
              alt={t(`images:${image.fileName}`)}
            />
            <Title>{t(`images:${image.fileName}`)}</Title>
            <Desc>{` - ${image.description}`}</Desc>
          </ImageBlock>
          <Link href={`${next}`} passHref shallow>
            <Arrow right>{"◁"}</Arrow>
          </Link>
        </ImageContainer>
        <ImageList />
      </Container>
    </CenterView>
  );
};

const Container = styled.div`
  @media screen and (min-width: 800px) {
    & ${ImageList} {
      display: none;
    }
  }
`;

interface ArrowProps {
  right?: boolean;
}

const Arrow = styled.a<ArrowProps>`
  width: 60px;
  cursor: pointer;
  transform: rotateY(${(props) => (props.right ? "180deg" : "none")});

  @media screen and (max-width: 800px) {
    width: 20px;
  }
`;

const Title = styled.span`
  font-size: 11px;
`;

const Desc = styled.span`
  font-size: 11px;
  color: #444;
`;

export default ImagePage;
