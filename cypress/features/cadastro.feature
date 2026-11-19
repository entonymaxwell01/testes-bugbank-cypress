# language: pt

@cadastro @regression
Funcionalidade: Cadastro de contas bancárias

  Como um novo cliente
  Quero cadastrar uma conta bancária
  Para utilizar os serviços do BugBank

  @smoke
  Cenário: Cadastro de conta com saldo inicial
    Dado que estou na área de cadastro
    Quando realizo o cadastro com dados válidos e saldo inicial
    Então minha conta deve ser criada com sucesso

  @negative 
  Cenário: Cadastro de conta com senhas diferentes
    Dado que estou na área de cadastro
    Quando realizo o cadastro com senhas diferentes
    Então deve ser exibida uma mensagem "As senhas não são iguais."


@smoke
Cenário: Cadastro de conta sem saldo inicial
    Dado que estou na área de cadastro
    Quando realizo o cadastro com dados válidos mas sem saldo inicial
    Então minha conta deve ser criada com sucesso

    @regression @negative
Esquema do Cenário: Cadastro sem preencher o campo <campo>
  Dado que estou na área de cadastro
  Quando realizo o cadastro sem preencher o campo "<campo>"
  Então deve ser exibida a mensagem "<mensagem>" para o campo "<campo>"

  Exemplos:
    | campo          | mensagem             |
    | email          | É campo obrigatório  |
    | name           | Nome não pode ser vazio |
    | password          | É campo obrigatório  |
    | confirmPassword | É campo obrigatório  |