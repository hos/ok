"use client";

import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import albums from "src/data/albums.json";

import { AlbumImage, UpdateUrlWithCarousel } from "../components/AlbumImage";
import { AlbumKeyboardNavigation } from "../components/AlbumKeyboardNavigation";
import { ImageList } from "../components/ImageList";
import Overlay from "../components/Overlay";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { cn } from "../lib/utils";

type AlbumViewProps = {
  albumName: string;
  imageName: string;
  large?: boolean;
};

export const AlbumView = (props: AlbumViewProps) => {
  const t = useTranslations();
  const [title, setTitle] = useState("");

  const { albumName, imageName, large } = props;

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
    <div className={cn(large ? "large-mode" : "", "h-full")}>
      <AlbumKeyboardNavigation imageName={imageName} album={album} />
      {large ? (
        <Overlay>
          <Carousel
            className="h-full w-full"
            opts={{ startIndex: currentImageIndex, loop: true }}
          >
            <UpdateUrlWithCarousel
              images={album?.images}
              album={album.path}
              large
              setTitle={setTitle}
            />
            <CarouselContent>
              {album?.images.map((img, index) => {
                return (
                  <AlbumImage
                    index={index}
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
          {!large ? (
            <UpdateUrlWithCarousel
              images={album?.images}
              album={album.path}
              setTitle={setTitle}
            />
          ) : null}
          <CarouselContent className="max-h-[80vh] max-md:max-h-[50vh]">
            {album?.images.map((img, index) => {
              return (
                <AlbumImage
                  index={index}
                  key={img.fileName}
                  image={img}
                  className="page-album"
                  imageClassName="w-full h-full"
                />
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="max-md:hidden" />
          <CarouselNext className="max-md:hidden" />
        </Carousel>

        <div className="flex flex-row justify-center">
          <p className="text-xs pt-5">
            {title || imageNameLocalized}
            <span className="text-gray-600">{` - ${image.description}`}</span>
          </p>
        </div>
        <ImageList className="md:hidden" albumPath={album?.path || ""} />
      </div>
    </div>
  );
};
