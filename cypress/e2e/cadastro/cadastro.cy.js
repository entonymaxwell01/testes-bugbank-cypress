import CadastroPage from "../../pages/CadastroPage";
import { faker } from "@faker-js/faker";

beforeEach(() => {
  cy.visit("/");
});

describe("Teste da funcionalidade de cadastro", () => {
  it.only("Deve cadastrar uma nova conta com sucesso", () => {
    cy.fixture("usuario.json").then((usuario) => {
      CadastroPage.clicarBotaoCadastro();
      CadastroPage.preencherEmail(usuario.email);
      CadastroPage.preencherNome(usuario.nome);
      CadastroPage.preencherSenha(usuario.senha);
      CadastroPage.preencherConfirmarSenha(usuario.senha);
      CadastroPage.preencherSaldo();
      CadastroPage.confirmarCadastro();
      CadastroPage.validarMensagemSucesso();
    });
  });

  it("Deve exibir mensagem de campo obrigatório ao não preencher o email", () => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherNome(faker.person.firstName());
    CadastroPage.preencherSenha(faker.internet.password());
    CadastroPage.preencherConfirmarSenha(faker.internet.password());
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemCampoObrigatorio();
  });

  it("Deve exibir mensagem de campo obrigatório ao não preencher o nome", () => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherEmail(faker.internet.email());
    CadastroPage.preencherSenha(faker.internet.password());
    CadastroPage.preencherConfirmarSenha(faker.internet.password());
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemErro("Nome não pode ser vazio");
  });

  it("Deve exibir mensagem de campo obrigatório ao não preencher a senha", () => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherEmail(faker.internet.email());
    CadastroPage.preencherNome(faker.person.firstName());
    CadastroPage.preencherConfirmarSenha(faker.internet.password());
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemCampoObrigatorio();
  });

  it("Deve exibir mensagem de campo obrigatório ao não preencher a confirmação de senha", () => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherEmail(faker.internet.email());
    CadastroPage.preencherNome(faker.person.firstName());
    CadastroPage.preencherSenha(faker.internet.password());
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemCampoObrigatorio();
  });

  it("Deve exibir mensagem de erro ao tentar confirmar o cadastro com senhas e confirmação de senha diferentes", () => {
    CadastroPage.clicarBotaoCadastro();
    CadastroPage.preencherEmail(faker.internet.email());
    CadastroPage.preencherNome(faker.person.firstName());
    CadastroPage.preencherSenha(faker.internet.password());
    CadastroPage.preencherConfirmarSenha(faker.internet.password());
    CadastroPage.preencherSaldo();
    CadastroPage.confirmarCadastro();
    CadastroPage.validarMensagemErro("As senhas não são iguais");
  });
});
