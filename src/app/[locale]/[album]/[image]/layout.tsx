import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import albums from "src/data/albums.json";

export async function generateMetadata({
  params,
}: {
  params: { image: string; album: string };
}): Promise<Metadata> {
  const imageName = decodeURIComponent(params.image);
  const albumName = decodeURIComponent(params.album);

  const album = albums.find((album) => album.path === albumName);
  const image = album?.images.find(
    (img) =>
      img.fileName === imageName + ".jpg" ||
      img.fileName === imageName + ".png",
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

export default function ImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
