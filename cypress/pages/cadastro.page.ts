import { cadastroElements, camposCadastro, commonElements } from "../elements/";
import type { Usuario } from "../types/usuario.types";
import commonPage from "./common.page";

class CadastroPage {
  goTo(): void {
    cy.visit("/");
  }

  abrirFormularioCadastro(): void {
    cy.getByRole("button", { name: "Registrar" }).click();
    cy.get(cadastroElements.cadastroForm).should("be.visible");
  }

  preencherFormulario(usuario: Usuario): void {
    cy.get(cadastroElements.cadastroForm).within(() => {
      commonPage.preencherCampo(cadastroElements.emailInput, usuario.email);
      commonPage.preencherCampo(cadastroElements.nameInput, usuario.name);
      commonPage.preencherCampo(cadastroElements.passwordInput, usuario.password);
      commonPage.preencherCampo(cadastroElements.passwordConfirmInput, usuario.confirmPassword);
    });

    if (usuario.isSaldo) {
      cy.get(cadastroElements.saldoRatio).click();
    }
  }

  confirmarCadastro(): void {
    cy.get(cadastroElements.cadastroForm).find(cadastroElements.cadastroButton).click();
  }

  validarCadastro(mensagemText: string): void {
    cy.get(commonElements.modalMensagem).should("be.visible").and("contain.text", mensagemText);
    cy.get(commonElements.closeModalButton).click();
  }

  validarMensagemCampo(campo: keyof typeof camposCadastro, mensagem: string): void {
    cy.get(cadastroElements.cadastroForm).within(() => {
      commonPage.validarCampoObrigatorio(camposCadastro[campo], mensagem);
    });
  }
}

export default new CadastroPage();
