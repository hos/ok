import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import albums from "src/data/albums.json";
import articles from "src/data/articles.json";

export const usePageNav = () => {
  const router = useRouter();
  const routes = useMemo(() => {
    return [
      "/",
      "/2000-2004",
      "/2005-2006",
      "/2007",
      "/2008-2009",
      "/2010-2014",
      "/2015",
      "/2016",
      "/2017-2018",
      "/2017-2019",
      "/2020",
      "/2021",
      "/2022",
      "/articles",
      "/vardan-azatyan-real-utopias",
      "/gohar-vardanyan-real-utopias",
      "/eva-khachatryan-walls",
      "/vardan-jaloyan-body-investments",
      "/elena-aydinyan-from-avant-garde-to-avant-garde",
      "/armen-yesayants-sevan",
      "/ashot-pashinyan-utopia-or-dystopia",
      "/biography",
      "/exhibitions",
      "/contacts",
    ];
  }, []);

  const current = useMemo(() => {
    const part = router.query.article || router.query.album?.[0] || "";
    return routes.indexOf(`/${part}`);
  }, [routes, router]);

  const normalize = useCallback((route: string) => {
    if (route.startsWith("/20")) {
      //  this is a album
      const album = albums.find(({ path }) => `/${path}` === route);
      if (album) {
        return (
          route +
          `/${album.images[album.default || 0]!.fileName.replace(".jpg", "")}`
        );
      }
    }

    const pure = route.replace("/", "");
    if (pure in articles) {
      return `/articles/${pure}`;
    }
    return route;
  }, []);

  const next = useMemo(() => {
    return normalize(routes[current + 1] || routes[0]);
  }, [routes, current, normalize]);

  const previous = useMemo(() => {
    return normalize(routes[current - 1] || routes[routes.length - 1] || "/");
  }, [routes, current, normalize]);

  return [next, previous];
};
