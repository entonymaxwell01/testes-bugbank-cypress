import { defineConfig } from "cypress";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import { allureCypress } from "allure-cypress/reporter";
import cypressOnFix from "cypress-on-fix";

export default defineConfig({
  e2e: {
    baseUrl: "https://bugbank.netlify.app",
    specPattern: "cypress/features/**/*.feature",
    supportFile: "cypress/support/e2e.ts",
    testIsolation: true,

    async setupNodeEvents(on, config) {
      on = cypressOnFix(on);

      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        }),
      );

      allureCypress(on, config, {
        resultsDir: "allure-results",
      });

      return config;
    },
  },

  screenshotOnRunFailure: true,
  video: false,
});
