import { useRouter } from "next/router";
import { useMemo } from "react";
import albums from "src/data/albums.json";

export const useAlbumNav = (
  image: string,
  album?: (typeof albums)[0] | null,
) => {
  const router = useRouter();
  const isLargeMode = router.query.mode + "" === "large";

  const queryString = useMemo(() => {
    const query = new URLSearchParams();
    if (isLargeMode) {
      query.append("mode", "large");
    }
    return query.toString();
  }, [isLargeMode]);

  const next = useMemo(() => {
    if (!album) {
      return null;
    }
    const idx = album.images.findIndex(
      (img) => img.fileName === image + ".jpg",
    );
    return (album.images[idx + 1] || album.images[0]).fileName;
  }, [album, image]);

  const previous = useMemo(() => {
    if (!album) {
      return null;
    }
    const idx = album.images.findIndex(
      (img) => img.fileName === image + ".jpg",
    );
    return (album.images[idx - 1] || album.images[album.images.length - 1])
      .fileName;
  }, [album, image]);

  return [
    next &&
      `/${album?.path}/${(next + "").replace(".jpg", "")}${
        queryString ? `?${queryString}` : ""
      }`,
    previous &&
      `/${album?.path}/${(previous + "").replace(".jpg", "")}${
        queryString ? `?${queryString}` : ""
      }`,
  ];
};
