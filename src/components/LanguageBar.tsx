import { Route } from "next";
import Link from "next/link";
import React from "react";

const langs = [
  { path: "hy", name: "հայ" },
  { path: "en", name: "eng" },
];

interface LanguageBarProps {
  currentPath: string;
}

export const LanguageBar: React.FC<LanguageBarProps> = ({ currentPath }) => {
  const currentPathWithoutLang = currentPath.replace(/\/[a-z]{2}\/?/, "");
  return (
    <div className="max-md:my-5 pt-5 inline-block text-[10px]">
      {langs.map((lang) => {
        return (
          <Link
            key={lang.path}
            href={`/${lang.path}/${currentPathWithoutLang}` as Route}
            className="text-red m-0.5 uppercase"
          >
            {lang.name}
          </Link>
        );
      })}
    </div>
  );
};
