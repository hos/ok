import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

import { Shortcuts } from "@/src/components/Shortcuts";

import { Menu } from "./Nav";

interface LayoutProps {
  children?: ReactNode;
}

export const Layout: React.FC<LayoutProps> = (props) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <div className="flex flex-row">
      <div className="md:w-3/4 py-8 inline-flex mt-14">{props.children}</div>
      <Menu
        t={t}
        navigate={router.push}
        pathname={router.asPath}
        slug={
          router.query.article?.toString() ||
          router.query.album?.[0] ||
          router.pathname.replaceAll("/", "")
        }
      />
      <Shortcuts />
    </div>
  );
};
