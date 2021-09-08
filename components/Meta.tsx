import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
}

export const Meta: React.FC<MetaProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Head>
      <title>{props.title || t("Karen Ohanyan")}</title>
      <meta name="description" content={props.description} />
      <meta name="url" content={props.url || router.asPath} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
