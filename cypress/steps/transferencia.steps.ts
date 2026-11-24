import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { TransferenciaPage, LoginPage, CommonPage } from "../pages";
import { prepararUsuariosStorage } from "../helpers";
import type { UsuarioPreparado } from "../helpers/storage.helpers";

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

When("realizo uma transferência de 200 reais", () => {
  if (!contaDestino) {
    throw new Error("Conta destinatária não cadastrada.");
  }
  TransferenciaPage.clicarMenuTransferencia();
  TransferenciaPage.preencherFormTransferencia(contaDestino.accountNumber, "200");
});

Then("a transferência deve ser concluída com sucesso", () => {
  TransferenciaPage.validarTransferenciaComSucesso();
  CommonPage.clicarBotaoVoltar();
});

Then("o saldo das contas deve ser atualizado corretamente", () => {
  const contaOrigem = obterContaOrigem();
  const contaDestino = obterContaDestino();

  TransferenciaPage.verificarSaldoConta(800);

  TransferenciaPage.verificarSaldoContaStorage(contaOrigem.usuario.email, 800);

  TransferenciaPage.verificarSaldoContaStorage(contaDestino.usuario.email, 200);
});
