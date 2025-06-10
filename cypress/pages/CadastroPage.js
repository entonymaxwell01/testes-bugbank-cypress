import { CadastroPageElements } from "../elements/CadastroPage.elements";
import { NotificacaoElements } from "../elements/Geral.elements";
import { faker } from "@faker-js/faker";

class CadastroPage {
  clicarBotaoCadastro() {
    cy.get(CadastroPageElements.cadastroButton).should("be.visible").click();
  }

  preencherEmail() {
    cy.get(CadastroPageElements.emailInput)
      .click({ force: true })
      .type(faker.internet.email());
  }

  preencherNome() {
    cy.get(CadastroPageElements.nomeInput)
      .click({ force: true })
      .type(faker.person.firstName());
  }

  preencherSenha() {
    const senha = faker.internet.password();

    cy.get(CadastroPageElements.senhaInput).click({ force: true }).type(senha);
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
}

export default new CadastroPage();
