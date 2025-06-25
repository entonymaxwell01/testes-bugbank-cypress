const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    charts: true,
    reportPageTitle: "Relatório de Testes",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    overwrite: false,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      allureWriter(on, config);

      return config;
    },
    baseUrl: "https://bugbank.netlify.app",
    env: {
      allure: true,
      allureResultsPath: "cypress/allure-results",
    },
  },
});
