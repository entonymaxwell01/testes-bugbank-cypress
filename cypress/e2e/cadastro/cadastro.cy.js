import CadastroPage from "../../pages/CadastroPage";
import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.allure().feature("Cadastro de Usuário").story("Cadastro Padrão");

  cy.visit("/");
});

describe("Teste da funcionalidade de cadastro", { tags: "@cadastro" }, () => {
  it(
    "Deve cadastrar uma nova conta com sucesso",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida o fluxo principal de cadastro de um novo usuário com saldo na conta."
        );
      cy.fixture("usuario.json").then((usuario) => {
        cy.allure().step("Acessar a página de cadastro");
        CadastroPage.clicarBotaoCadastro();

        cy.allure().step("Preencher dados do formulário");
        CadastroPage.preencherEmail(usuario.email);
        CadastroPage.preencherNome(usuario.nome);
        CadastroPage.preencherSenha(usuario.senha);
        CadastroPage.preencherConfirmarSenha(usuario.senha);
        CadastroPage.preencherSaldo();

        cy.allure().step("Confirmar o cadastro");
        CadastroPage.confirmarCadastro();

        cy.allure().step("Validar mensagem de sucesso");
        CadastroPage.validarMensagemSucesso();
      });
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher o email",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida a mensagem de campo obrigatório ao não preencher o email."
        );

      cy.allure().step("Acessar a página de cadastro");
      CadastroPage.clicarBotaoCadastro();

      cy.allure().step("Preencher dados do formulário sem email");
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();

      cy.allure().step("Tentar confirmar o cadastro");
      CadastroPage.confirmarCadastro();

      cy.allure().step("Validar mensagem de campo obrigatório");
      CadastroPage.validarMensagemCampoObrigatorio();
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher o nome",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida a mensagem de campo obrigatório ao não preencher o nome."
        );

      cy.allure().step("Acessar a página de cadastro");
      CadastroPage.clicarBotaoCadastro();

      cy.allure().step("Preencher dados do formulário sem nome");
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();

      cy.allure().step("Tentar confirmar o cadastro");
      CadastroPage.confirmarCadastro();

      cy.allure().step("Validar mensagem de campo obrigatório");
      CadastroPage.validarMensagemErro("Nome não pode ser vazio");
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher a senha",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida a mensagem de campo obrigatório ao não preencher a senha."
        );

      cy.allure().step("Acessar a página de cadastro");
      CadastroPage.clicarBotaoCadastro();

      cy.allure().step("Preencher dados do formulário sem senha");
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();

      cy.allure().step("Tentar confirmar o cadastro");
      CadastroPage.confirmarCadastro();

      cy.allure().step("Validar mensagem de campo obrigatório");
      CadastroPage.validarMensagemCampoObrigatorio();
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher a confirmação de senha",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida a mensagem de campo obrigatório ao não preencher a confirmação de senha."
        );

      cy.allure().step("Acessar a página de cadastro");
      CadastroPage.clicarBotaoCadastro();

      cy.allure().step(
        "Preencher dados do formulário sem confirmação de senha"
      );
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherSaldo();

      cy.allure().step("Tentar confirmar o cadastro");
      CadastroPage.confirmarCadastro();

      cy.allure().step("Validar mensagem de campo obrigatório");
      CadastroPage.validarMensagemCampoObrigatorio();
    }
  );

  it(
    "Deve exibir mensagem de erro ao tentar confirmar o cadastro com senhas e confirmação de senha diferentes",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida a mensagem de erro ao tentar confirmar o cadastro com senhas e confirmação de senha diferentes."
        );

      cy.allure().step("Acessar a página de cadastro");
      CadastroPage.clicarBotaoCadastro();

      cy.allure().step("Preencher dados do formulário com senhas diferentes");
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();

      cy.allure().step("Tentar confirmar o cadastro");
      CadastroPage.confirmarCadastro();

      cy.allure().step("Validar mensagem de erro");
      CadastroPage.validarMensagemErro("As senhas não são iguais");
    }
  );

  it(
    "Deve exibir mensagem de erro ao tentar cadastrar uma conta com email já cadastrado",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.allure()
        .severity("critical")
        .description(
          "Este teste valida a mensagem de erro ao tentar cadastrar uma conta com email já cadastrado."
        );
      cy.fixture("usuario.json").then((usuario) => {
        cy.allure().step("Cadastrar email previamente");
        cy.cadastro();

        cy.allure().step("Acessar a página de cadastro");
        CadastroPage.clicarBotaoCadastro();

        cy.allure().step(
          "Preencher dados do formulário com email já cadastrado"
        );
        CadastroPage.limparCampos();
        CadastroPage.preencherEmail(usuario.email);
        CadastroPage.preencherNome(usuario.nome);
        CadastroPage.preencherSenha(usuario.senha);
        CadastroPage.preencherConfirmarSenha(usuario.senha);
        CadastroPage.preencherSaldo();

        cy.allure().step("Tentar confirmar o cadastro");
        CadastroPage.confirmarCadastro();

        cy.allure().step("Validar mensagem de erro");
        CadastroPage.validarMensagemErro("Email já cadastrado");
      });
    }
  );
});
