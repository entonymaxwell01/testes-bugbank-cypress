import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import { ExtratoPage, TransferenciaPage, LoginPage, CommonPage } from "../pages";
import type { UsuarioPreparado } from "../helpers/storage.helpers";
import { prepararUsuariosStorage } from "../helpers";

let contaOrigem: UsuarioPreparado | undefined;
let contaDestino: UsuarioPreparado | undefined;

Before({ tags: "@extrato" }, () => {
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

Given("que possuo duas contas bancárias cadastradas", () => {
  if (!contaDestino || !contaOrigem) {
    throw new Error("Contas não cadastradas.");
  }
  TransferenciaPage.verificarConta(contaOrigem.usuario.email, contaOrigem.accountNumber);
  TransferenciaPage.verificarConta(contaDestino.usuario.email, contaDestino.accountNumber);
});

Given("realizei uma transferência de {int} reais", (tranferenciaValue: number) => {
  if (!contaDestino) {
    throw new Error("Conta destinatária não cadastrada.");
  }
  TransferenciaPage.clicarMenuTransferencia();
  TransferenciaPage.preencherFormTransferencia(
    contaDestino.accountNumber,
    String(tranferenciaValue),
  );
  TransferenciaPage.validarPopupTransferencia("Transferencia realizada com sucesso");
  CommonPage.clicarBotaoVoltar();
});

When("acesso o extrato da minha conta", () => {
  ExtratoPage.clicarMenuExtrato();
});

Then("devo visualizar o registro da transferência realizada", () => {
  TransferenciaPage.verificarSaldoConta(800);
  ExtratoPage.validarTransacao({
    data: new Date().toLocaleDateString("pt-BR"),
    tipo: "Abertura de conta",
    descricao: "Saldo adicionado ao abrir conta",
    valor: 1000,
  });
});

Then("o valor da movimentação deve ser de {int} reais", (transactionValue: number) => {
  ExtratoPage.validarTransacao({
    data: new Date().toLocaleDateString("pt-BR"),
    tipo: "Transferência enviada",
    descricao: "-",
    valor: -transactionValue,
  });
});
