import { useRouter } from "next/dist/client/router";
import Head from "next/head";
import { useTranslation } from "next-i18next";

interface MetaProps {
  title?: string;
  description?: string;
  url?: string;
  type?: "article" | "website";
  imageURL?: string;
  imageAlt?: string;
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
  const width = 1200;
  const height = 1200;

  return (
    <Head>
      <title>{props.title || t("Karen Ohanyan")}</title>
      <meta name="description" content={props.description} />
      <meta name="url" content={url} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absImage} />
      <meta property="og:image:width" content={width + ""} />
      <meta property="og:image:height" content={height + ""} />
      <meta
        property="og:image:alt"
        content={props.imageAlt || props.description}
      />
      <meta property="twitter:image" content={absImage} />
      <meta
        property="twitter:image:alt"
        content={props.imageAlt || props.description}
      />
      <meta property="twitter:image:width" content={width + ""} />
      <meta property="twitter:image:height" content={height + ""} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="og:type" content={props.type || "website"} />

      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
