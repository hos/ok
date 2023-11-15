"use client";

import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

import { Nav } from "@/src/components/Nav";
import { locales } from "@/src/i18n";

const AppRouterNavigation = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const { slug: album, article } = params || {};
  const articleName = Array.isArray(article) ? article[0] : article;

  const [albumName] = Array.isArray(album) ? album : [];

  const slug = (
    albumName || // if this is an album page
    articleName || // if this is an article page
    pathname.split("/").at(-1) || // if this is a page without a slug
    ""
  ).replace(new RegExp(`${locale}$`), "");

  if (!locales.includes(locale as any)) {
    notFound();
  }

  return (
    <Nav
      isLargeMode={searchParams?.get("mode") === "large"}
      pathname={pathname || "/"}
      slug={slug}
    />
  );
};

export default AppRouterNavigation;
