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
    <div className="w-full max-w-[600px] p-5 mx-auto">
      <h1>{t("Media")}</h1>
      <div>
        <div className="m-auto">
          {Object.entries(mediaItems).map(([key, value]) => {
            return (
              <div key={key}>
                <h3>{t(`media.${key}`)}</h3>
                <iframe
                  src={value}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                ></iframe>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
