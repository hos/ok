import { useTranslation } from "next-i18next";
import { Person } from "schema-dts";

export const useLD = () => {
  const { t } = useTranslation();

  const karen: Person = {
    "@type": "Person",
    name: t("Karen Ohanyan") || "Karen Ohanyan",
  };

  return { karen };
};
