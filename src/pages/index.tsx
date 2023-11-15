import type { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Meta } from "src/components/Meta";

import TheOriginOfTheWorld from "@/public/images/large/The-Origin-of-the-World.jpg";

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

  return (
    <div className="w-full mx-auto flex flex-col justify-start">
      <Meta
        title={t("Karen Ohanyan")}
        description={t("description")}
        imageURL={`/images/The-Origin-of-the-World.jpg`}
        imageAlt={t(`images:The-Origin-of-the-World.jpg`)}
      />
      <div className="w-[80%] mx-auto flex flex-row items-center max-md:w-full">
        <div className="w-full h-auto text-center">
          <Image
            priority
            src={TheOriginOfTheWorld}
            alt={t("images:The-Origin-of-the-World.jpg")}
            className="max-w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
