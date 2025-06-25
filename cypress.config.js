const { defineConfig } = require("cypress");
const dayjs = require("dayjs");
const reportFolder = `cypress/reports/${dayjs().format("DD-MM-YYYY_HH-mm-ss")}`;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    baseUrl: "https://bugbank.netlify.app",
    reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: reportFolder,
      charts: true,
      reportPageTitle: "Relatório de Testes",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      html: true,
      json: true,
      overwrite: false,
    },
    env: {
      allureReuseAfterSpec: true,
      allureResultsPath: "allure-results",
    },
  },
});
