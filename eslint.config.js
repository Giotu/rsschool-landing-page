import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["src/js/**/*.js"],
    languageOptions: { globals: globals.browser },
    rules: {
      "no-console": "warn",
    },
  },
  prettierConfig,
];
