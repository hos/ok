"use client";

import { notFound, useParams, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { AlbumImage, UpdateUrlWithCarousel } from "src/components/AlbumImage";
import { AlbumKeyboardNavigation } from "src/components/AlbumKeyboardNavigation";
import { ImageList } from "src/components/ImageList";
import Overlay from "src/components/Overlay";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "src/components/ui/carousel";
import albums from "src/data/albums.json";
import { cn } from "src/lib/utils";

const AlbumPage = () => {
  const params = useParams();
  const search = useSearchParams();

  const t = useTranslations();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const albumName = decodeURIComponent(params.album.toString());
  const imageName = decodeURIComponent(params.image.toString());

  const large = search.get("mode") === "large";

  const album = albums.find((album) => album.path === albumName);

  if (!album) {
    notFound();
  }

  const currentImageIndex = album?.images.findIndex(
    (img) =>
      img.fileName === imageName + ".jpg" ||
      img.fileName === imageName + ".png",
  );

  const image = album?.images.at(currentImageIndex);
  const overlayBackground = (album.background || "black") as "black" | "white";

  if (!image) {
    notFound();
  }
  const fileNameNoExt = decodeURIComponent(
    image.fileName.replace(/\.[^/.]+$/, ""),
  );
  const imageNameLocalized = t(`images.${fileNameNoExt}`);

  return (
    <div className={cn(large ? "large-mode" : "", "h-full")}>
      <AlbumKeyboardNavigation imageName={imageName} album={album} />
      {large ? (
        <Overlay background={overlayBackground}>
          <Carousel
            className="h-full w-full"
            opts={{ startIndex: currentImageIndex, loop: true }}
          >
            <UpdateUrlWithCarousel
              images={album?.images}
              album={album.path}
              large
              setTitle={setTitle}
              setDescription={setDescription}
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
                    zoomOut={album.zoomOut}
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
              setDescription={setDescription}
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
                  zoomOut={album.zoomOut}
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
            {(description || image.description) && (
              <span className="text-gray-600">{` - ${description || image.description}`}</span>
            )}
          </p>
        </div>
        <ImageList className="md:hidden" />
      </div>
    </div>
  );
};

export default AlbumPage;
