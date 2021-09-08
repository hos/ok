import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

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
  const { i18n } = useTranslation();
  return (
    <CenterView>
      <Meta
        title={i18n.t("Karen Ohanyan")}
        description={i18n.t("description")}
      />
      <ImageContainer>
        <Image
          layout="responsive"
          width="800"
          height="500"
          objectFit="contain"
          src="/images/The-Origin-of-the-World.jpg"
          alt={i18n.t("The Origin of the World")}
        />
      </ImageContainer>
    </CenterView>
  );
};

export default Home;
