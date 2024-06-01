import { useMDXComponent } from 'next-contentlayer/hooks';
import { allDocuments } from 'contentlayer/generated';
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import React from "react";
import { NewsArticle } from "schema-dts";
import { Meta } from "src/components/Meta";
import texts from "src/data/texts.json";

type Props = {
  params: { textId: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { params } = props;
  const { textId } = params;

  const name = textId?.toString();
  const t = await getTranslations();

  return { title: t(`texts.${name}`), description: t(`${name}`) };
}

interface TextProps {
  params: { textId: string; locale: string };
}

const Text: React.FC<TextProps> = ({ params }) => {
  const { locale, textId } = params || {};

  const t = getTranslations("texts");

  const name = (textId || "").toString();
  // @ts-expect-error
  const meta = texts[name];

  const document = allDocuments.find((doc) => doc._id === textId);
  if (!document) {
    return notFound();
  }

  const MDXContent = useMDXComponent(document.body.code);

  const schema: NewsArticle = {
    "@type": "NewsArticle",
    datePublished: `${meta.year}`,
  };

  return (
    <div className="w-full max-w-[600px] mx-auto flex flex-col justify-start">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      ></script>
      <Meta />
      {meta.noTitle ? null : <h2 className="text-red">{t(`${name}`)}</h2>}
      <MDXContent />
    </div>
  );
};

export default Text;
