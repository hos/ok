import { useMemo } from "react";
import albums from "src/data/albums.json";

export const useAlbumNav = (image: string, album?: typeof albums[0] | null) => {
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
