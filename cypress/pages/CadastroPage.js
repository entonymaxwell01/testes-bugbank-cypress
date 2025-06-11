import { CadastroPageElements } from "../elements/CadastroPage.elements";
import { NotificacaoElements } from "../elements/Notificacao.elements";

class CadastroPage {
  clicarBotaoCadastro() {
    cy.get(CadastroPageElements.cadastroButton).should("be.visible").click();
  }

  preencherEmail(email) {
    cy.get(CadastroPageElements.emailInput).click({ force: true }).type(email);
  }

  preencherNome(nome) {
    cy.get(CadastroPageElements.nomeInput).click({ force: true }).type(nome);
  }

  preencherSenha(senha) {
    cy.get(CadastroPageElements.senhaInput).click({ force: true }).type(senha);
  }

  preencherConfirmarSenha(senha) {
    cy.get(CadastroPageElements.confirmarSenhaInput)
      .click({ force: true })
      .type(senha);
  }

  preencherSaldo() {
    cy.get(CadastroPageElements.saldoLabel).click({ force: true });
  }

  confirmarCadastro() {
    cy.get(CadastroPageElements.cadastrarButtonConfirm).click({ force: true });
  }

  validarMensagemSucesso() {
    cy.get(NotificacaoElements.textoRetorno)
      .should("be.visible")
      .contains("foi criada com sucesso");
    cy.get(NotificacaoElements.botaoFechar).should("be.visible").click();
  }

  validarMensagemCampoObrigatorio() {
    cy.get(CadastroPageElements.cadastroDiv)
      .find(NotificacaoElements.campoObrigatorioMensagem)
      .filter((index, el) => {
        return Cypress.$(el).css("opacity") === "1";
      })
      .and("have.css", "opacity", "1")
      .contains("É campo obrigatório");
    cy.get(NotificacaoElements.botaoFechar).should("be.visible").click();
  }

  validarMensagemErro(mensagem) {
    cy.get(NotificacaoElements.containerInformacao)
      .should("be.visible")
      .and("have.css", "opacity", "1")
      .find(NotificacaoElements.textoRetorno)
      .should("be.visible")
      .contains(mensagem);
    cy.get(NotificacaoElements.botaoFechar).should("be.visible").click();
  }

  limparCampos() {
    cy.get(CadastroPageElements.emailInput).clear({ force: true });
    cy.get(CadastroPageElements.nomeInput).clear({ force: true });
    cy.get(CadastroPageElements.senhaInput).clear({ force: true });
    cy.get(CadastroPageElements.confirmarSenhaInput).clear({ force: true });
  }
}

export default new CadastroPage();
