import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";
import { ImageList } from "src/components/ImageList";
import albums from "src/data/albums.json";

import { AlbumImage, UpdateUrlWithCarousel } from "@/src/components/AlbumImage";
import { AlbumKeyboardNavigation } from "@/src/components/AlbumKeyboardNavigation";
import Overlay from "@/src/components/Overlay";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/src/components/ui/carousel";
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
  const { slug } = params;

  const t = await getTranslations();

  const [albumName, imageName] = (Array.isArray(slug) ? slug : []).map(
    decodeURI,
  );

  const isLargeMode = searchParams?.mode === "large";

  const album = albums.find((album) => album.path === albumName);

  if (!album) {
    notFound();
  }

  const currentImageIndex = album?.images.findIndex(
    (img) => img.fileName === imageName + ".jpg",
  );

  const image = album?.images.at(currentImageIndex);

  if (!image) {
    notFound();
  }

  const fileNameNoExt = image.fileName.replace(".jpg", "");
  const imageNameLocalized = t(`images.${fileNameNoExt}`);

  return (
    <div className={cn(isLargeMode ? "large-mode" : "", "h-full")}>
      <AlbumKeyboardNavigation imageName={imageName} album={album} />
      {isLargeMode ? (
        <Overlay>
          <Carousel
            className="h-full w-full"
            opts={{ startIndex: currentImageIndex, loop: true }}
          >
            <UpdateUrlWithCarousel
              images={album?.images}
              album={album.path}
              large
            />
            <CarouselContent>
              {album?.images.map((img) => {
                return (
                  <AlbumImage
                    key={img.fileName}
                    image={img}
                    className="focus-album"
                    imageClassName="w-screen h-screen"
                  />
                );
              })}
            </CarouselContent>
          </Carousel>
        </Overlay>
      ) : null}
      {/* className "album" can be used with shortcuts */}
      <div className="album h-full flex flex-col items-center justify-start">
        <Carousel
          className="w-full max-w-3xl"
          opts={{ startIndex: currentImageIndex, loop: true }}
        >
          <UpdateUrlWithCarousel images={album?.images} album={album.path} />
          <CarouselContent className="max-h-[80vh] max-md:max-h-[50vh]">
            {album?.images.map((img) => {
              return (
                <AlbumImage
                  key={img.fileName}
                  image={img}
                  className="page-album"
                  imageClassName="w-full h-full"
                />
              );
            })}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="flex flex-row justify-center">
          <p className="text-xs pt-5">
            {imageNameLocalized}
            <span className="text-gray-600">{` - ${image.description}`}</span>
          </p>
        </div>
        <ImageList className="md:hidden" albumPath={album?.path || ""} />
      </div>
    </div>
  );
};

export default AlbumPage;
