import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { ImageBlock } from "../components/Block";
import { CenterView } from "../components/CenterView";
import { ImageContainer } from "../components/ImageContainer";
import { Meta } from "../components/Meta";
import { useShortcut } from "../hooks/useShortcut";
import TheOriginOfTheWorld from "../public/images/The-Origin-Of-The-World.jpg";

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
            priority
            objectFit="contain"
            src={TheOriginOfTheWorld}
            alt={t("images:The-Origin-of-the-World.jpg")}
          />
        </ImageBlock>
      </ImageContainer>
    </CenterView>
  );
};

export default Home;
