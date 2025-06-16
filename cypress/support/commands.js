// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import CadastroPage from "../pages/CadastroPage";

Cypress.Commands.add("cadastro", () => {
  cy.fixture("usuario.json").then((usuario) => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherEmail(usuario.email);
    CadastroPage.preencherNome(usuario.nome);
    CadastroPage.preencherSenha(usuario.senha);
    CadastroPage.preencherConfirmarSenha(usuario.senha);
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemSucesso();
  });
});
