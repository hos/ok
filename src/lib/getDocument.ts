import fs from "fs/promises";
import path from "path";

export const getDocument = async (
  name: string,
  locale?: string,
): Promise<string | null> => {
  let html = "";
  const localePath = path.resolve(
    process.cwd(),
    `./public/locales/${locale || "en"}/docs/${name}.html`,
  );
  try {
    html = (await fs.readFile(localePath)).toString();
  } catch {
    // try to default to english
    if (locale !== "en") {
      const localePath = path.resolve(
        process.cwd(),
        `./public/locales/${locale || "en"}/docs/${name}.html`,
      );
      html = (await fs.readFile(localePath)).toString();
    }
  }

  if (html) {
    return html;
  } else {
    return null;
  }
};

export default getDocument;
