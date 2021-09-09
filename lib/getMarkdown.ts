import fs from "fs/promises";
import path from "path";

import markdownToHtml from "./markdownToHtml";

export const getMarkdownAsHtml = async (
  name: string,
  locale?: string
): Promise<string | null> => {
  let markdown = "";
  const localePath = path.resolve(
    process.cwd(),
    `./public/locales/${locale || "en"}/${name}.md`
  );
  try {
    markdown = (await fs.readFile(localePath)).toString();
  } catch (err) {
    // try to default to english
    if (locale !== "en") {
      const localePath = path.resolve(
        process.cwd(),
        `./public/locales/${locale || "en"}/${name}.md`
      );
      markdown = (await fs.readFile(localePath)).toString();
    }
  }

  if (markdown) {
    return markdownToHtml(markdown);
  } else {
    return null;
  }
};

export default getMarkdownAsHtml;
