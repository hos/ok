import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React, { useEffect } from "react";
import { VisualArtwork } from "schema-dts";
import { ImageList } from "src/components/ImageList";
import { Meta } from "src/components/Meta";
import albums from "src/data/albums.json";
import { useAlbumNav } from "src/hooks/useAlbumNav";
import { useShortcut } from "src/hooks/useShortcut";
import { useLD } from "src/lib/ld";

import { i18n } from "@/next-i18next.config";

import Overlay from "../components/Overlay";
import { cn } from "../lib/utils";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths: string[] = [];

  for (const album of albums) {
    for (const img of album.images) {
      paths.push(`/${album.path}/${img.fileName.replace(".jpg", "")}`);
      for (const locale of i18n?.locales || []) {
        paths.push(
          `/${locale}/${album.path}/${img.fileName.replace(".jpg", "")}`,
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
    (img) => img.fileName === imageName + ".jpg",
  );

  if (!image) {
    return null;
  }

  return (
    <div
      className={cn(
        "w-full mx-auto flex flex-col justify-start",
        isLargeMode ? "large-mode" : "",
      )}
    >
      {isLargeMode ? (
        <Overlay>
          <Image
            quality={100}
            src={`/images/large/${image.fileName}`}
            alt={image.description}
            fill
            sizes="100vw"
            style={{
              objectFit: "contain",
            }}
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
      <div className="album">
        <div className="w-[80%] mx-auto flex flex-row items-center max-md:w-full">
          <Link href={`${previous}`} shallow>
            <Arrow
              className="[.large-mode_&]:left-4"
              iconClassName="-rotate-[135deg]"
            />
          </Link>
          <div className="w-full h-auto text-center">
            <Link
              href={{ pathname: router.asPath, query: { mode: "large" } }}
              shallow
            >
              <Image
                priority
                quality={100}
                width="800"
                height="500"
                src={`/images/large/${image.fileName}`}
                alt={t(`images:${image.fileName}`)}
                sizes="100vw"
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Link>
            <p className="text-xs m-0 m-0 pb-5">
              {t(`images:${image.fileName}`)}
              <span className="text-gray-600">{` - ${image.description}`}</span>
            </p>
          </div>
          <Link href={`${next}`} shallow>
            <Arrow
              className="[.large-mode_&]:right-4"
              iconClassName="rotate-45"
            />
          </Link>
        </div>
        <ImageList className="md:hidden" />
      </div>
    </div>
  );
};

const Arrow = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => (
  <span
    className={cn(
      "w-[48px] h-[48px] leading-[48px] text-center cursor-pointer [.large-mode_&]:top-1/2 [.large-mode_&]:fixed [.large-mode_&]:z-20",
      className,
    )}
  >
    <ArrowIcon className={iconClassName} />
  </span>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <span
    className={cn(
      `h-3
       w-3
       border-solid
       border-black
       border-0
       border-t-2
       border-r-2
       inline-block
       p-0.5
       [.large-mode_&]:border-white`,
      className,
    )}
  />
);

export default ImagePage;
