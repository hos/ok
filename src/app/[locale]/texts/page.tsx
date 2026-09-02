import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";
import texts from "src/data/texts.json";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/texts">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return { title: t("Texts"), description: t("description") };
}

export default async function TextsPage(props: PageProps<"/[locale]/texts">) {
  const params = await props.params;
  const locale = params.locale?.toString();
  setRequestLocale(locale!);
  const t = await getTranslations();

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start p-5">
      <div className="m-auto pb-28 max-w-2xl flex flex-col gap-6">
        {Object.entries(texts).map(([key, value]) => {
          const title = t(key);
          if (title === key) {
            return null;
          }

          if (value.hasLink) {
            return (
              <Link href={`/${locale}/texts/${key}`} key={key} passHref>
                <h4 className="text-red font-medium">{t(`texts.${key}`)}</h4>
                <p className="text-sm">
                  {/* @ts-ignore */}
                  {value.noAuthor ? null : t(`texts.${value.author}`)}
                  {"year" in value ? ` / ${value.year}` : ""}
                </p>
                <p className="text-xs">{t(key)}</p>
              </Link>
            );
          }

          return (
            <div className="cursor-default" key={key}>
              <h4 className="text-red font-medium">{t(`texts.${key}`)}</h4>
              <p className="text-sm">
                {/* @ts-ignore */}
                {value.noAuthor ? null : t(`texts.${value.author}`)}
                {"year" in value ? ` / ${value.year}` : ""}
              </p>
              <p className="text-xs">{t(key)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
