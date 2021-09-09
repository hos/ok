import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  type?: "article" | "website";
  imageURL?: string;
}

export const Meta: React.FC<MetaProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();

  const withOrigin = (val: string) =>
    val.startsWith("http") ? val : `https://karenohanyan.art${val}`;

  const imageUrl = props.imageURL
    ? props.imageURL
    : `/images/Karen-Ohanyan.jpg`;
  const absImage = withOrigin(imageUrl);
  const url = withOrigin(props.url || router.asPath);

  return (
    <Head>
      <title>{props.title || t("Karen Ohanyan")}</title>
      <meta name="description" content={props.description} />
      <meta name="url" content={url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absImage} />
      <meta property="og:type" content={props.type || "website"} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
