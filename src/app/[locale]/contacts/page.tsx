import { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import React from "react";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contacts">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return { title: t("Contacts"), description: t("description") };
}

const contacts = [
  {
    label: "Email",
    handle: "karenohanyan.art@gmail.com",
    href: "mailto:karenohanyan.art@gmail.com",
  },
  {
    label: "Facebook",
    handle: "karen.ohanyan.14",
    href: "https://www.facebook.com/karen.ohanyan.14",
  },
  {
    label: "Instagram",
    handle: "@ok_art_karenohanyan",
    href: "https://www.instagram.com/ok_art_karenohanyan/",
  },
] as const;

const Contacts = async (props: PageProps<"/[locale]/contacts">) => {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start max-md:px-5">
      <h1 className="m-0 pb-5 text-2xl leading-tight font-normal">
        {t("Contacts")}
      </h1>
      <div className="w-full max-w-[537px] pb-28">
        {contacts.map(({ label, handle, href }) => (
          <Link
            className="border-black/10 border-t block py-5 first:border-t-0 first:pt-0"
            href={href}
            key={label}
            rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
            target="_blank"
          >
            <p className="text-red m-0 text-[11px] leading-5 tracking-[0.08em] uppercase">
              {label}
            </p>
            <p className="m-0 mt-1 text-[13px] leading-5 font-bold">{handle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
