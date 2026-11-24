import { homeElements, transferenciaElements } from "../elements";
import type { ContaStorage } from "../types/conta.types";
import commonPage from "./common.page";

class TransferenciaPage {
  goTo(): void {
    cy.visit("/home");
  }

  verificarHomePage(nomeUsuario: string): void {
    cy.get(homeElements.accountName).should("be.visible").and("contain.text", `Olá ${nomeUsuario}`);
  }

  verificarSaldoConta(saldoEsperado: number): void {
    cy.get(homeElements.accountSaldo)
      .find("span")
      .invoke("text")
      .then((texto) => {
        const saldo = Number(texto.replace(/[^\d,-]/g, "").replace(",", "."));

        expect(saldo, "Saldo da conta").to.equals(saldoEsperado);
      });
  }

  verificarContaDestinataria(email: string, accountNumber: string): void {
    cy.window().then((win) => {
      const raw = win.localStorage.getItem(email);

      if (raw === null) {
        throw new Error(`Conta destinatária não encontrada: ${email}`);
      }

      const conta = JSON.parse(raw) as ContaStorage;

      expect(conta.email).to.equal(email);
      expect(conta.accountNumber).to.equal(accountNumber);
      expect(conta.logged).to.equal(false);
    });
  }

  clicarMenuTransferencia(): void {
    cy.get(homeElements.transferenciaButton).click();
    cy.get(transferenciaElements.accountData).should("be.visible");
  }

  preencherFormTransferencia(account: string, value: string): void {
    const accountNumber = account.split("-")[0];
    const accountDigit = account.split("-")[1];
    console.log(accountNumber);
    cy.get(transferenciaElements.accountData).within(() => {
      cy.get(transferenciaElements.accountNumber).type(accountNumber);
      cy.get(transferenciaElements.accountDigit).type(accountDigit);
    });
    cy.get(transferenciaElements.transferenciaValue).type(value);
    cy.get(transferenciaElements.transferirButton).click();
  }

  validarTransferenciaComSucesso(): void {
    commonPage.validarPopup("Transferencia realizada com sucesso");
  }

  verificarSaldoContaStorage(email: string, saldoEsperado: number): void {
    cy.window().then((win) => {
      const raw = win.localStorage.getItem(email);

      if (raw === null) {
        throw new Error(`Conta não encontrada: ${email}`);
      }

      const conta = JSON.parse(raw) as ContaStorage;

      expect(conta.balance, `Saldo da conta ${email}`).to.equal(saldoEsperado);
    });
  }
}

export default new TransferenciaPage();
