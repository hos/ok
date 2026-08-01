import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";
import prettierConfig from "eslint-config-prettier/flat";
import prettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";

export default defineConfig([
  globalIgnores([
    "**/node_modules/**/*",
    "**/.next/**/*",
    "**/dist/**/*",
    "**/build/**/*",
    "**/coverage",
    "**/.yarn",
  ]),
  next,
  prettierConfig,
  {
    plugins: {
      prettier,
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },

    rules: {
      "prettier/prettier": ["error"],
      "simple-import-sort/imports": ["error"],
      "react/display-name": ["off"],
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
]);
