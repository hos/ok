import { GetStaticProps } from "next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import { Meta } from "src/components/Meta";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      ...(await serverSideTranslations(ctx.locale || "en", [
        "images",
        "meta",
        "albums",
      ])),
    },
  };
};

interface ContactsProps {
  _?: void;
}

export const Contacts: React.FC<ContactsProps> = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Meta />

      <Link
        className="font-width-500 text-base"
        href="mailto:karenohanyan.art@gmail.com"
        target="_blank"
      >
        google: karenohanyan.art@gmail.com
      </Link>
      <Link
        className="font-width-500 text-base"
        href="https://www.facebook.com/karen.ohanyan.14"
        target="_blank"
      >
        facebook: karen.ohanyan.14
      </Link>
    </div>
  );
};

export default Contacts;
