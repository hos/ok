"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { Meta } from "src/components/Meta";
import texts from "src/data/texts.json";

export default function TextsPage() {
  const t = useTranslations();

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start">
      <Meta />

      <div className="m-auto pb-28 max-w-2xl">
        {Object.entries(texts).map(([key, value]) => {
          const title = t(key);
          if (title === key) {
            return null;
          }
          return (
            <Link href={`/texts/${key}`} key={key} passHref>
              <h4 className="text-red font-medium">{t(`texts.${key}`)}</h4>
              <p className="text-sm">
                {t(`texts.${value.author}`)} / {value.year || 0}
              </p>
              <p className="text-xs">{t(key)}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
