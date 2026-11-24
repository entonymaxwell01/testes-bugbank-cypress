import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { TransferenciaPage, LoginPage, CommonPage } from "../pages";
import { prepararUsuariosStorage } from "../helpers";
import type { UsuarioPreparado } from "../helpers/storage.helpers";
import { faker } from "@faker-js/faker";

let contaOrigem: UsuarioPreparado | undefined;
let contaDestino: UsuarioPreparado | undefined;

function obterContaOrigem(): UsuarioPreparado {
  if (!contaOrigem) {
    throw new Error("Conta de origem não preparada.");
  }

  return contaOrigem;
}

function obterContaDestino(): UsuarioPreparado {
  if (!contaDestino) {
    throw new Error("Conta destinatária não preparada.");
  }

  return contaDestino;
}

Before({ tags: "@transferencia" }, () => {
  contaOrigem = undefined;
  contaDestino = undefined;

  [contaOrigem, contaDestino] = prepararUsuariosStorage([
    { saldoInicial: 1000 },
    { saldoInicial: 0 },
  ]);

  LoginPage.preencherFormularioLogin(contaOrigem.usuario.email, contaOrigem.usuario.password);

  LoginPage.confirmarLogin();

  TransferenciaPage.verificarHomePage(contaOrigem.usuario.name);
});

Given("que possuo uma conta com saldo disponível", () => {
  TransferenciaPage.verificarSaldoConta(1000);
});

Given("existe uma conta destinatária cadastrada", () => {
  if (!contaDestino) {
    throw new Error("Conta destinatária não cadastrada.");
  }
  TransferenciaPage.verificarContaDestinataria(
    contaDestino.usuario.email,
    contaDestino.accountNumber,
  );
});

When("realizo uma transferência de {int} reais", (valorTransferencia: number) => {
  if (!contaDestino) {
    throw new Error("Conta destinatária não cadastrada.");
  }
  TransferenciaPage.clicarMenuTransferencia();
  TransferenciaPage.preencherFormTransferencia(
    contaDestino.accountNumber,
    String(valorTransferencia),
  );
});

When("realizo uma transferência de {int} reais para uma conta inexistente", () => {
  const numeroContaInexistente = `${faker.number.int({
    min: 100,
    max: 999,
  })}-${faker.number.int({ min: 0, max: 9 })}`;
  TransferenciaPage.clicarMenuTransferencia();
  TransferenciaPage.preencherFormTransferencia(numeroContaInexistente, "200");
});

Then("a transferência deve ser concluída com sucesso", () => {
  TransferenciaPage.validarPopupTransferencia("Transferencia realizada com sucesso");
  CommonPage.clicarBotaoVoltar();
});

Then("o saldo das contas deve ser atualizado corretamente", () => {
  const contaOrigem = obterContaOrigem();
  const contaDestino = obterContaDestino();

  TransferenciaPage.verificarSaldoConta(800);

  TransferenciaPage.verificarSaldoContaStorage(contaOrigem.usuario.email, 800);

  TransferenciaPage.verificarSaldoContaStorage(contaDestino.usuario.email, 200);
});

Then("a transferência deve ser recusada com a mensagem {string}", (mensagemError: string) => {
  TransferenciaPage.validarPopupTransferencia(mensagemError);
  CommonPage.clicarBotaoVoltar();
});

Then("os saldos das contas devem permanecer inalterados", () => {
  const contaOrigem = obterContaOrigem();
  const contaDestino = obterContaDestino();

  TransferenciaPage.verificarSaldoConta(1000);
  TransferenciaPage.verificarSaldoContaStorage(contaOrigem.usuario.email, 1000);
  TransferenciaPage.verificarSaldoContaStorage(contaDestino.usuario.email, 0);
});
