import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Person, VisualArtwork } from "schema-dts";
import { ImageList } from "src/components/ImageList";
import { Meta } from "src/components/Meta";
import albums from "src/data/albums.json";

import { AlbumKeyboardNavigation } from "@/src/components/AlbumKeyboardNavigation";
import Overlay from "@/src/components/Overlay";
import { albumNavPages } from "@/src/lib/albumNavPages";
import { cn } from "@/src/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const slug = params?.slug;
  const imageName = slug?.[1];
  const albumName = slug?.[0];

  const album = albums.find((album) => album.path === albumName);
  const image = album?.images.find(
    (img) => img.fileName === imageName + ".jpg",
  );

  const t = await getTranslations();
  const name = t("Karen Ohanyan") || "Karen Ohanyan";
  const imageLocalizedName = t(`images.${imageName}`);
  const imageDescription = image?.description;
  const title = `${imageLocalizedName} - ${imageDescription}, ${name}`;
  const description = t("description");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      title,
      description,
    },
  };
}

const AlbumPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string[] };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { slug } = params;
  const t = await getTranslations();

  const karen: Person = {
    "@type": "Person",
    name: t("Karen Ohanyan") || "Karen Ohanyan",
  };

  const [albumName, imageName] = (Array.isArray(slug) ? slug : []).map(
    decodeURI,
  );

  const isLargeMode = searchParams?.mode === "large";

  const album = albums.find((album) => album.path === albumName);
  const image = album?.images.find(
    (img) => img.fileName === imageName + ".jpg",
  );

  const [next, previous] = albumNavPages(imageName, isLargeMode, album);

  if (!image) {
    return null;
  }

  const fileNameNoExt = image.fileName.replace(".jpg", "");
  const imageNameLocalized = t(`images.${fileNameNoExt}`);

  const schema: VisualArtwork = {
    "@type": "VisualArtwork",
    name: imageNameLocalized,
    copyrightHolder: karen,
    artist: karen,
    artform: album?.artform,
  };

  return (
    <div
      className={cn(
        "w-full mx-auto flex flex-col justify-start",
        isLargeMode ? "large-mode" : "",
      )}
    >
      <AlbumKeyboardNavigation imageName={imageName} album={album} />
      {isLargeMode ? (
        <Overlay>
          <Image
            quality={100}
            src={`/images/large/${image.fileName}`}
            alt={image.description}
            fill
            sizes="100vw"
            className="object-contain"
          ></Image>
        </Overlay>
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
      <Meta
        title={`${t("Karen Ohanyan")} - ${imageNameLocalized}`}
        description={image.description || t("description")}
        imageURL={`/images/large/${image.fileName}`}
        imageAlt={imageNameLocalized}
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
            <Link href={{ query: { mode: "large" } }} shallow>
              <Image
                priority
                quality={100}
                width="800"
                height="500"
                src={`/images/large/${image.fileName}`}
                alt={imageNameLocalized}
                data-filename={fileNameNoExt}
                sizes="100vw"
                className="object-contain"
              />
            </Link>
            <p className="text-xs m-0 m-0 pb-5">
              {imageNameLocalized}
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
        <ImageList className="md:hidden" albumName={album?.name || ""} />
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

export default AlbumPage;
