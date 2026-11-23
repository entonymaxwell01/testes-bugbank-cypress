import { loginElements, camposLogin } from "../elements/";
import commonPage from "./common.page";

class LoginPage {
  goTo(): void {
    cy.visit("/");
  }

  preencherFormularioLogin(email: string, password: string): void {
    cy.get(loginElements.loginCard).within(() => {
      commonPage.preencherCampo(loginElements.emailInput, email);
      commonPage.preencherCampo(loginElements.passwordInput, password);
    });
  }

  confirmarLogin(): void {
    cy.get(loginElements.loginCard).within(() => {
      cy.get(loginElements.acessarButton).click();
    });
  }

  validarLogin(nomeUsuario: string): void {
    cy.get(loginElements.accountName)
      .should("be.visible")
      .and("contain.text", `Olá ${nomeUsuario}`);
  }

  validarMensagemCampo(campo: keyof typeof camposLogin, mensagem: string): void {
    cy.get(loginElements.loginCard).within(() => {
      commonPage.validarCampoObrigatorio(camposLogin[campo], mensagem);
    });
  }

  validarLoginRecusado(): void {
    cy.get(loginElements.loginCard).should("be.visible");
    cy.get(loginElements.accountName).should("not.exist");
  }
}

export default new LoginPage();
