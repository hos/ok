"use client";

import {
  notFound,
  useParams,
  usePathname,
  useSearchParams,
} from "next/navigation";

import { Nav } from "@/src/components/Nav";
import { locales } from "@/src/config";

const AppRouterNavigation = ({ locale }: { locale: string }) => {
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const album = params.album?.toString();
  const textId = Array.isArray(params.textId)
    ? params.textId[0]
    : params.textId;

  const [albumName] = Array.isArray(album) ? album : [];

  const slug = (
    albumName || // if this is an album page
    textId || // if this is an text page
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
