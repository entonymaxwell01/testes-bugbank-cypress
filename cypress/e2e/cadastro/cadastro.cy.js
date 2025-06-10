import CadastroPage from "../../pages/CadastroPage";

before(() => {
  cy.visit("/"); // Substitua pela URL do seu site
});

describe("Teste da funcionalidade de cadastro", () => {
  it.only("Deve cadastrar um novo usuário com sucesso", () => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherEmail();
    CadastroPage.preencherNome();
    CadastroPage.preencherSenha();
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemSucesso();
  });
});
