import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/media">): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();
  return { title: t("Media"), description: t("description") };
}

const mediaItems = {
  unmeritorious:
    "https://www.youtube.com/embed/toxdne_U4jY?si=QeXjyeQp03Q9dJK3",
  dreamer: "https://www.youtube.com/embed/0-VS5onKs6A?si=7946LlwEmLtL16lr",
  realUtopias: "https://www.youtube.com/embed/GzPt0upyGfM?si=NKRzaWHLcHIhzB_W",
  cca: "https://www.youtube.com/embed/fpl1JerGkFA?si=wxPScq-m1j4LyfFv",
};

export default async function MediaPage(props: PageProps<"/[locale]/media">) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <div className="w-full max-w-[800px] mx-auto flex flex-col justify-start max-md:px-5">
      <h1 className="m-0 pb-5 text-2xl leading-tight font-normal">
        {t("Media")}
      </h1>
      <div className="w-full max-w-[700px] pb-28">
        {Object.entries(mediaItems).map(([key, value]) => {
          return (
            <div
              className="border-black/10 border-t py-8 first:border-t-0 first:pt-0"
              key={key}
            >
              <h2 className="m-0 mb-4 text-[15px] leading-6 font-medium">
                {t(`media.${key}`)}
              </h2>
              <div className="aspect-video w-full">
                <iframe
                  className="h-full w-full"
                  src={value}
                  title={t(`media.${key}`)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                ></iframe>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
