import { useTranslations } from "next-intl";
import { Person } from "schema-dts";

export const useLD = () => {
  const t = useTranslations();

  const karen: Person = {
    "@type": "Person",
    name: t("Karen Ohanyan") || "Karen Ohanyan",
  };

  return { karen };
};
