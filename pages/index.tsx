import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ImageBlock } from "../components/Block";
import { CenterView } from "../components/CenterView";
import { ImageContainer } from "../components/ImageContainer";
import { Meta } from "../components/Meta";
import { useShortcut } from "../hooks/useShortcut";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "meta",
        "albums",
        "images",
      ])),
    },
  };
};

const Home: NextPage = () => {
  const { t } = useTranslation();

  useShortcut();

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
            layout="responsive"
            width="800"
            height="500"
            objectFit="contain"
            src="/images/The-Origin-of-the-World.jpg"
            alt={t("images:The-Origin-of-the-World.jpg")}
          />
        </ImageBlock>
      </ImageContainer>
    </CenterView>
  );
};

export default Home;
