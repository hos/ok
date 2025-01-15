import albums from "src/data/albums.json";

export const albumNavPages = (
  image: string,
  isLargeMode: boolean,
  locale: string,
  album?: (typeof albums)[0] | null,
) => {
  const queryString = (() => {
    const query = new URLSearchParams();
    if (isLargeMode) {
      query.append("mode", "large");
    }
    return query.toString();
  })();

  const next = (() => {
    if (!album) {
      return null;
    }
    const idx = album.images.findIndex(
      (img) =>
        img.fileName === image + ".jpg" || img.fileName === image + ".png",
    );
    return (album.images[idx + 1] || album.images[0]).fileName;
  })();

  const previous = (() => {
    if (!album) {
      return null;
    }
    const idx = album.images.findIndex(
      (img) =>
        img.fileName === image + ".jpg" || img.fileName === image + ".png",
    );
    return (album.images[idx - 1] || album.images[album.images.length - 1])
      .fileName;
  })();

  return [
    next &&
      `/${locale}/${album?.path}/${(next + "").replace(/\.[^/.]+$/, "")}${
        queryString ? `?${queryString}` : ""
      }`,
    previous &&
      `/${locale}/${album?.path}/${(previous + "").replace(/\.[^/.]+$/, "")}${
        queryString ? `?${queryString}` : ""
      }`,
  ];
};
