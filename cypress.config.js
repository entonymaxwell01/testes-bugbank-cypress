const { defineConfig } = require("cypress");
const dayjs = require("dayjs");
const reportFolder = `cypress/reports/${dayjs().format("DD-MM-YYYY_HH-mm-ss")}`;

module.exports = defineConfig({
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
    timestamp: "dd-mm-yyyy_HH-MM-ss",
    reportDir: "cypress/reports",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://bugbank.netlify.app",
  },
});
