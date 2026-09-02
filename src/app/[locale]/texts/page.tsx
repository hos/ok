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
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start max-md:px-5">
      <h1 className="m-0 pb-5 text-2xl leading-tight font-normal">
        {t("Texts")}
      </h1>
      <div className="w-full max-w-[537px] pb-28">
        {Object.entries(texts).map(([key, value]) => {
          const title = t(key);
          if (title === key) {
            return null;
          }

          if (value.hasLink) {
            return (
              <Link
                className="block py-5"
                href={`/${locale}/texts/${key}`}
                key={key}
              >
                <h2 className="m-0 text-[15px] leading-6 font-medium text-red">
                  {t(`texts.${key}`)}
                </h2>
                <p className="m-0 mt-0.5 text-[13px] leading-5 opacity-60">
                  {/* @ts-ignore */}
                  {value.noAuthor ? null : t(`texts.${value.author}`)}
                  {"year" in value ? ` / ${value.year}` : ""}
                </p>
                <p className="m-0 mt-2 line-clamp-2 text-[15px] leading-[1.6]">
                  {t(key)}
                </p>
              </Link>
            );
          }

          return (
            <article className="border-black/10 border-l py-5 pl-4" key={key}>
              <p className="m-0 text-[11px] leading-5 tracking-[0.08em] uppercase opacity-50">
                {/* @ts-ignore */}
                {t(`texts.${key}`)}
                {/* @ts-ignore */}
                {value.noAuthor ? null : ` — ${t(`texts.${value.author}`)}`}
                {"year" in value ? ` / ${value.year}` : ""}
              </p>
              <p className="m-0 mt-2 text-[15px] leading-[1.6] italic">
                {t(key)}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
