import { commonElements } from "../elements";

class CommonPage {
  validarCampoObrigatorio(seletor: string, mensagem: string): void {
    cy.get(seletor)
      .should("have.value", "")
      .parent()
      .find(commonElements.inputWarningMsg)
      .should("be.visible")
      .and("have.text", mensagem);
  }

  preencherCampo(seletor: string, valor: string): void {
    if (valor !== "") {
      cy.get(seletor).type(valor);
    }
  }

  validarPopup(mensagem: string) {
    cy.get(commonElements.popupModal)
      .should("be.visible")
      .parent()
      .find(commonElements.modalMensagem)
      .should("be.visible")
      .and("contain.text", mensagem);
  }
}

export default new CommonPage();
