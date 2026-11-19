import js from "@eslint/js";
import tseslint from "typescript-eslint";
import cypress from "eslint-plugin-cypress";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "allure-results/**",
      "allure-report/**",
      "cypress/screenshots/**",
      "cypress/videos/**",
      "cypress/reports/**",
    ],
  },
  {
    files: ["**/*.ts"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["cypress/**/*.ts"],
    extends: [cypress.configs.recommended],
  },
]);
