import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Person, VisualArtwork } from "schema-dts";

import { CenterView } from "../../components/CenterView";
import { ImageContainer } from "../../components/ImageContainer";
import { Meta } from "../../components/Meta";
import albums from "../../data/albums.json";

export const getServerSideProps: GetStaticProps = async (ctx) => {
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

  const [albumName, image] = Array.isArray(router.query.album)
    ? router.query.album
    : [];

  const album = albums.find((album) => album.path === albumName);

  const karen: Person = {
    "@type": "Person",
    name: t("Karen Ohanyan") || "Karen Ohanyan",
  };

  const schema: VisualArtwork = {
    "@type": "VisualArtwork",
    name: t(`images:${image}`),
    copyrightHolder: karen,
    artist: karen,
    artform: album?.artform,
  };

  return (
    <CenterView>
      <Meta
        title={`${t("Karen Ohanyan")} - ${t(`images:${image}`)}`}
        description={t("description")}
      />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
      <ImageContainer>
        <Image
          layout="responsive"
          width="800"
          height="500"
          objectFit="contain"
          src={`/images/large/${image}`}
          alt={t(image)}
        />
      </ImageContainer>
    </CenterView>
  );
};

export default ImagePage;
