import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import React, { useState, useEffect } from "react";
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
  const imageUrl = `/images/large/${image?.fileName}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [imageUrl],
    },
    twitter: {
      title,
      description,
      images: [imageUrl],
    },
  };
}

const AlbumPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string[]; locale: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const { slug, locale } = params;
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

  const [next, previous] = albumNavPages(
    imageName,
    isLargeMode,
    locale.toString(),
    album,
  );

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

  // Touch event state
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Function to handle touch start
  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX);
  }

  // Function to handle touch move
  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  // Function to handle touch end
  function handleTouchEnd() {
    if (touchStart - touchEnd > 150) {
      // Swipe left
      if (next) window.location.href = next;
    }

    if (touchStart - touchEnd < -150) {
      // Swipe right
      if (previous) window.location.href = previous;
    }
  }

  // Effect to add and remove touch event listeners
  useEffect(() => {
    const imageElement = document.getElementById("imageElement");
    if (imageElement) {
      imageElement.addEventListener("touchstart", handleTouchStart);
      imageElement.addEventListener("touchmove", handleTouchMove);
      imageElement.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (imageElement) {
        imageElement.removeEventListener("touchstart", handleTouchStart);
        imageElement.removeEventListener("touchmove", handleTouchMove);
        imageElement.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [next, previous]);

  return (
    <div
      className={cn(
        "w-full mx-auto flex flex-col justify-start max-md:h-full h-4/5",
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
            id="imageElement"
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
      <div className="album h-full">
        <div className="w-[90%] md:w-[80%] mx-auto flex flex-row items-center h-full max-md:h-1/2">
          <Link href={`${previous}`} shallow>
            <Arrow
              className="[.large-mode_&]:left-4"
              iconClassName="-rotate-[135deg]"
            />
          </Link>
          <div className="w-full h-full text-center">
            <Link href={{ query: { mode: "large" } }} shallow>
              <Image
                priority
                quality={100}
                width="800"
                height="500"
                src={`/images/large/${image.fileName}`}
                alt={imageNameLocalized}
                data-filename={fileNameNoExt}
                className="object-contain xl:max-h-[500px] w-full h-full"
                style={{ objectFit: "contain" }}
                id="imageElement"
              />
            </Link>
            <p className="text-xs m-0 pb-5">
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
        <ImageList className="md:hidden" albumPath={album?.path || ""} />
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
