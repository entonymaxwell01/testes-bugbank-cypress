import { CommonPage, LoginPage } from "../pages";
import { Given, When, Then, Before } from "@badeball/cypress-cucumber-preprocessor";
import type { Usuario } from "../types/usuario.types";
import { prepararUsuarioStorage } from "../helpers/";
import { usuarioFactory } from "../factories/usuario.factory";
import { camposLogin } from "../elements";
import { faker } from "@faker-js/faker";

let usuario: Usuario;

Before({ tags: "@login" }, () => {
  usuario = undefined as unknown as Usuario;
});

Given("que estou na página de login", () => {
  LoginPage.goTo();
});

Given("que possuo uma conta cadastrada", () => {
  const dados = prepararUsuarioStorage();

  usuario = dados.usuario;
});

When("realizo login com email e senha validos", () => {
  LoginPage.preencherFormularioLogin(usuario.email, usuario.password);
  LoginPage.confirmarLogin();
});

When("tento realizar login sem preencher o campo {string}", (campo: string) => {
  if (campo !== "email" && campo !== "password") {
    throw new Error(`Campo de login inválido: ${campo}`);
  }

  const dadosUsuario = usuarioFactory({
    [campo]: "",
  });

  LoginPage.preencherFormularioLogin(dadosUsuario.email, dadosUsuario.password);
  LoginPage.confirmarLogin();
});

When("tento realizar login com {string}", (condicao: string) => {
  let email = usuario.email;
  let password = usuario.password;

  switch (condicao) {
    case "email não cadastrado":
      email = faker.internet.email();
      break;

    case "senha incorreta":
      password = "SenhaIncorreta123!";
      break;

    default:
      throw new Error(`Condição inválida: ${condicao}`);
  }

  LoginPage.preencherFormularioLogin(email, password);
  LoginPage.confirmarLogin();
});

Then("devo realizar login na minha conta com sucesso", () => {
  LoginPage.validarLogin(usuario.name);
});

Then(
  "deve ser exibida uma mensagem de obrigatoriedade do campo {string}",
  (campo: keyof typeof camposLogin) => {
    LoginPage.validarMensagemCampo(campo, "É campo obrigatório");
  },
);

Then("o login deve ser recusado", () => {
  CommonPage.validarPopup("Usuário ou senha inválido.");
  LoginPage.validarLoginRecusado();
});
