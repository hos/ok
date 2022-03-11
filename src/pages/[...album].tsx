import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { VisualArtwork } from "schema-dts";
import { ImageBlock } from "src/components/Block";
import { CenterView } from "src/components/CenterView";
import { ImageContainer } from "src/components/ImageContainer";
import { ImageList } from "src/components/ImageList";
import { Meta } from "src/components/Meta";
import albums from "src/data/albums.json";
import { useAlbumNav } from "src/hooks/useAlbumNav";
import { useShortcut } from "src/hooks/useShortcut";
import { useLD } from "src/lib/ld";
import styled from "styled-components";

import { i18n } from "@/next-i18next.config";

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
  const isLargeMode = router.query.mode + "" === "large";

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
      if (e.key === "ArrowLeft" && previous) {
        router.push(previous, undefined, { shallow: true });
      }
      if (e.key === "ArrowRight" && next) {
        router.push(next, undefined, { shallow: true });
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [isLargeMode, router, previous, next]);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isLargeMode) {
        const url = new URL(location.href);
        url.search = "";
        router.push(url.toString(), undefined, {
          shallow: true,
        });
      }
    };
    document.addEventListener("keydown", handle);

    return () => document.removeEventListener("keydown", handle);
  }, [isLargeMode, router, previous, next]);

  const image = album?.images.find(
    (img) => img.fileName === imageName + ".jpg"
  );

  if (!image) {
    return null;
  }

  return (
    <CenterView className={isLargeMode ? "large-mode" : ""}>
      {isLargeMode ? (
        <Overlay>
          <Image
            quality={100}
            layout="fill"
            src={`/images/large/${image.fileName}`}
            alt={image.description}
            objectFit="contain"
          ></Image>
        </Overlay>
      ) : null}
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
            <Arrow className="left">
              <span />
            </Arrow>
          </Link>
          <ImageBlock>
            <Link
              href={{ pathname: router.asPath, query: { mode: "large" } }}
              shallow
              passHref
            >
              <a>
                <Image
                  priority
                  quality={100}
                  layout="responsive"
                  width="800"
                  height="500"
                  objectFit="contain"
                  src={`/images/large/${image.fileName}`}
                  alt={t(`images:${image.fileName}`)}
                />
              </a>
            </Link>
            <Title>{t(`images:${image.fileName}`)}</Title>
            <Desc>{` - ${image.description}`}</Desc>
          </ImageBlock>
          <Link href={`${next}`} passHref shallow>
            <Arrow id="arrow" className="right">
              <span />
            </Arrow>
          </Link>
        </ImageContainer>
        <Hide>
          {album?.images.map((img) => {
            return (
              <Image
                key={img.fileName}
                layout="responsive"
                width="800"
                height="500"
                objectFit="contain"
                loading="lazy"
                src={`/images/large/${img.fileName}`}
                alt={t(`images:${img.fileName}`)}
              />
            );
          })}
        </Hide>
        <ImageList />
      </Container>
    </CenterView>
  );
};

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 1);
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div`
  @media screen and (min-width: 800px) {
    & ${ImageList} {
      display: none;
    }
  }
`;

const Hide = styled.div`
  position: fixed;
  visibility: hidden;
  overflow: hidden;
`;

interface ArrowProps {}

const Arrow = styled.a<ArrowProps>`
  height: 48px;
  width: 48px;
  line-height: 48px;
  text-align: center;
  cursor: pointer;

  & span {
    height: 10px;
    width: 10px;
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
  }

  .large-mode & {
    position: fixed;
    color: white;
    top: 50%;
    z-index: 10;
  }

  .large-mode & span {
    border: solid white;
    border-width: 0 2px 2px 0;
  }

  &.right {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  &.left {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }

  .large-mode &.left {
    left: 1rem;
  }
  .large-mode &.right {
    right: 1rem;
  }

  @media screen and (max-width: 800px) {
    width: 48px;
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
