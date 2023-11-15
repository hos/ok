import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface LanguageBarProps {}

const langs = [
  { path: "hy", name: "հայ" },
  { path: "en", name: "eng" },
  { path: "ru", name: "рус" },
];

export const LanguageBar: React.FC<LanguageBarProps> = () => {
  const router = useRouter();

  return (
    <div className="max-md:my-5 pt-5 inline-block text-[10px]">
      {langs.map((lang) => {
        return (
          <Link
            key={lang.path}
            href={router.asPath}
            locale={lang.path}
            className="text-red m-0.5 uppercase"
          >
            {lang.name}
          </Link>
        );
      })}
    </div>
  );
};
