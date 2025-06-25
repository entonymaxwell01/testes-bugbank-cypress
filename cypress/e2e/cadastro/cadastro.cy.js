import CadastroPage from "../../pages/CadastroPage";
import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.visit("/");
});

cy.allure().feature("Cadastro de Usuário").story("Cadastro Padrão");

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
      CadastroPage.clicarBotaoCadastro();
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();
      CadastroPage.confirmarCadastro();
      CadastroPage.validarMensagemCampoObrigatorio();
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher o nome",
    { tags: ["@regression", "@smoke"] },
    () => {
      CadastroPage.clicarBotaoCadastro();
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();
      CadastroPage.confirmarCadastro();
      CadastroPage.validarMensagemErro("Nome não pode ser vazio");
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher a senha",
    { tags: ["@regression", "@smoke"] },
    () => {
      CadastroPage.clicarBotaoCadastro();
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();
      CadastroPage.confirmarCadastro();
      CadastroPage.validarMensagemCampoObrigatorio();
    }
  );

  it(
    "Deve exibir mensagem de campo obrigatório ao não preencher a confirmação de senha",
    { tags: ["@regression", "@smoke"] },
    () => {
      CadastroPage.clicarBotaoCadastro();
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherSaldo();
      CadastroPage.confirmarCadastro();
      CadastroPage.validarMensagemCampoObrigatorio();
    }
  );

  it(
    "Deve exibir mensagem de erro ao tentar confirmar o cadastro com senhas e confirmação de senha diferentes",
    { tags: ["@regression", "@smoke"] },
    () => {
      CadastroPage.clicarBotaoCadastro();
      CadastroPage.preencherEmail(faker.internet.email());
      CadastroPage.preencherNome(faker.person.firstName());
      CadastroPage.preencherSenha(faker.internet.password());
      CadastroPage.preencherConfirmarSenha(faker.internet.password());
      CadastroPage.preencherSaldo();
      CadastroPage.confirmarCadastro();
      CadastroPage.validarMensagemErro("As senhas não são iguais");
    }
  );

  it(
    "Deve exibir mensagem de erro ao tentar cadastrar uma conta com email já cadastrado",
    { tags: ["@regression", "@smoke"] },
    () => {
      cy.fixture("usuario.json").then((usuario) => {
        // Primeiro cadastro para garantir que o email já está cadastrado
        cy.cadastro();
        CadastroPage.clicarBotaoCadastro();
        CadastroPage.limparCampos();
        CadastroPage.preencherEmail(usuario.email);
        CadastroPage.preencherNome(usuario.nome);
        CadastroPage.preencherSenha(usuario.senha);
        CadastroPage.preencherConfirmarSenha(usuario.senha);
        CadastroPage.preencherSaldo();
        CadastroPage.confirmarCadastro();
        CadastroPage.validarMensagemErro("Email já cadastrado");
      });
    }
  );
});
