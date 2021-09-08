import { GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

import { CenterView } from "../components/CenterView";
import { ImageContainer } from "../components/ImageContainer";
import { Meta } from "../components/Meta";

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
  const { i18n } = useTranslation();

  const [album, image] = Array.isArray(router.query.album)
    ? router.query.album
    : [];

  return (
    <CenterView>
      <Meta
        title={`${i18n.t("Karen Ohanyan")} - ${i18n.t(album)}`}
        description={i18n.t("description")}
      />
      <ImageContainer>
        <Image
          layout="responsive"
          width="800"
          height="500"
          objectFit="contain"
          src={`/images/large/${image}`}
          alt={i18n.t(image)}
        />
      </ImageContainer>
    </CenterView>
  );
};

export default ImagePage;
