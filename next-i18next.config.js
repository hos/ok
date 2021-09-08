const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "hy", "ru"],
    defaultNS: "meta",
  },
  localePath: path.resolve("./public/locales"),
};
