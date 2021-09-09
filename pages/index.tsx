import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
