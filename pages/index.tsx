import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

import { ImageBlock } from "../components/Block";
import { CenterView } from "../components/CenterView";
import { ImageContainer } from "../components/ImageContainer";
import { Meta } from "../components/Meta";

export const getServerSideProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", ["meta", "albums"])),
    },
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation();
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const _img = document.querySelector(
      'img[alt="The Origin of the World"]'
    ) as HTMLImageElement;
    setImg(_img);
  }, [setImg]);

  useEffect(() => {
    if (!img) {
      return;
    }

    const onDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "o") {
        if (!img) {
          return null;
        }
        img.style.transition = "2s";
        img.style.filter = "invert(100%)";
      }
    };

    const onUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "o") {
        img.style.filter = "none";
      }
    };

    document.addEventListener("keydown", onDown);
    document.addEventListener("keyup", onUp);

    return () => {
      document.removeEventListener("keydown", onDown);
      document.removeEventListener("keyup", onUp);
    };
  }, [img]);

  return (
    <CenterView>
      <Meta title={t("Karen Ohanyan")} description={t("description")} />
      <ImageContainer>
        <ImageBlock>
          <Image
            layout="responsive"
            width="800"
            height="500"
            objectFit="contain"
            src="/images/The-Origin-of-the-World.jpg"
            alt={t("The Origin of the World")}
          />
        </ImageBlock>
      </ImageContainer>
    </CenterView>
  );
};

export default Home;
