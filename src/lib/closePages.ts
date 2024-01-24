import albums from "src/data/albums.json";
import texts from "src/data/texts.json";

const routes = [
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
  "/texts",
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

const normalize = (route: string) => {
  if (route.startsWith("/20")) {
    const album = albums.find(({ path }) => `/${path}` === route);
    //  this is a album
    if (album) {
      return (
        route +
        `/${album.images[album.default || 0]!.fileName.replace(".jpg", "")}`
      );
    }
  }

  const pure = route.replace("/", "");

  if (pure in texts) {
    return `/texts/${pure}`;
  }
  return route;
};

export const closePages = (slug: string) => {
  const currentRouteIndex = routes.indexOf(`/${slug}`);

  const next = normalize(routes[currentRouteIndex + 1] || routes[0]);
  const previous = normalize(
    routes[currentRouteIndex - 1] || routes[routes.length - 1] || "/",
  );

  return [next, previous];
};
