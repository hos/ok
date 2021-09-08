import { useRouter } from "next/dist/client/router";
import Head from "next/head";

interface MetaProps {
  title: string;
  description: string;
  url?: string;
}

export const Meta: React.FC<MetaProps> = (props) => {
  const router = useRouter();
  return (
    <Head>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta name="url" content={props.url || router.asPath} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
