import Link from "next/link";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import React from "react";
import { Meta } from "src/components/Meta";
import texts from "src/data/texts.json";

export default async function TextsPage() {
  const t = await getTranslations();
  const locale = useLocale();

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start p-5">
      <Meta />

      <div className="m-auto pb-28 max-w-2xl">
        {Object.entries(texts).map(([key, value]) => {
          const title = t(key);
          if (title === key) {
            return null;
          }
          return (
            <Link
              href={value.hasLink ? `/${locale}/texts/${key}` : "#"}
              key={key}
              passHref
            >
              <h4 className="text-red font-medium">{t(`texts.${key}`)}</h4>
              <p className="text-sm">
                {/* @ts-ignore */}
                {value.noAuthor ? null : t(`texts.${value.author}`)}
                {"year" in value ? ` / ${value.year}` : ""}
              </p>
              <p className="text-xs">{t(key)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
