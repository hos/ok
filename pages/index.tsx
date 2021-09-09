import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback, useEffect, useState } from "react";

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
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const _img = document.querySelector(
      'img[alt="The Origin of the World"]'
    ) as HTMLImageElement;
    setImg(_img);
  }, [setImg]);

  const addFilter = useCallback(
    (transition: number = 2) => {
      if (!img) {
        return null;
      }
      img.style.transition = `${transition}s`;
      img.style.filter = "invert(100%)";
    },
    [img]
  );

  const removeFilter = useCallback(
    (transition: number = 2) => {
      if (!img) {
        return null;
      }
      img.style.transition = `${transition}s`;
      img.style.filter = "none";
    },
    [img]
  );

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "o") {
        addFilter();
      }
    };

    const onUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "o") {
        removeFilter();
      }
    };

    document.addEventListener("keydown", onDown);
    document.addEventListener("keyup", onUp);

    return () => {
      document.removeEventListener("keydown", onDown);
      document.removeEventListener("keyup", onUp);
    };
  }, [addFilter, removeFilter]);

  useEffect(() => {
    if (counter === 10) {
      addFilter(5);
    }

    if (counter > 10) {
      setCounter(0);
      removeFilter(1);
    }
  }, [counter, setCounter, addFilter, removeFilter]);

  return (
    <CenterView>
      <Meta
        title={t("Karen Ohanyan")}
        description={t("description")}
        imageURL={`/images/The-Origin-of-the-World.jpg`}
        imageAlt={t(`images:The-Origin-of-the-World.jpg`)}
      />
      <ImageContainer>
        <ImageBlock>
          <Image
            onClick={() => setCounter((val) => val + 1)}
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
