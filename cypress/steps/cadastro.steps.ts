import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { CadastroPage, CommonPage } from "../pages";
import { usuarioFactory } from "../factories/usuario.factory";
import { camposCadastro } from "./../elements/cadastro.elements";
import type { Usuario } from "../types/usuario.types";

Given("que estou na área de cadastro", () => {
  CadastroPage.goTo();
  CadastroPage.abrirFormularioCadastro();
});

When("realizo o cadastro com dados válidos e saldo inicial", () => {
  const usuario = usuarioFactory({ isSaldo: true });

  CadastroPage.preencherFormulario(usuario);
  CadastroPage.confirmarCadastro();
});

When("realizo o cadastro com dados válidos mas sem saldo inicial", () => {
  const usuario = usuarioFactory({ isSaldo: false });

  CadastroPage.preencherFormulario(usuario);
  CadastroPage.confirmarCadastro();
});

When("realizo o cadastro sem preencher o campo {string}", (campo: keyof Usuario) => {
  const usuario = usuarioFactory({
    [campo]: "",
  });

  CadastroPage.preencherFormulario(usuario);
  CadastroPage.confirmarCadastro();
});

When("realizo o cadastro com senhas diferentes", () => {
  const usuario = usuarioFactory({ password: "senhaIncorreta" });

  CadastroPage.preencherFormulario(usuario);
  CadastroPage.confirmarCadastro();
  CommonPage.validarPopup("As senhas não são iguais.");
});

Then("minha conta deve ser criada com sucesso", () => {
  CadastroPage.validarCadastro("foi criada com sucesso");
});

Then(
  "deve ser exibida a mensagem {string} para o campo {string}",
  (mensagem: string, campo: keyof typeof camposCadastro) => {
    if (campo === "name") {
      CommonPage.validarPopup("Nome não pode ser vazio.");
    } else {
      CadastroPage.validarMensagemCampo(campo, mensagem);
    }
  },
);

Then("deve ser exibida uma mensagem {string}", (textoMensagem: string) => {
  CommonPage.validarPopup(textoMensagem);
});
