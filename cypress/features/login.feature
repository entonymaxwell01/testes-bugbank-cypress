# language: pt
@login
@regression
Funcionalidade: Login de contas bancárias
  Como um cliente devidamente cadastrado
  Quero poder realizar login na minha conta

  @smoke
  Cenário: Login com credencias validas
    Dado que possuo uma conta cadastrada
    Quando realizo login com email e senha validos
    Então devo realizar login na minha conta com sucesso

  @negative
  Esquema do Cenário: Login sem preencher o campo <campo>
    Dado que estou na página de login
    Quando tento realizar login sem preencher o campo "<campo>"
    Então deve ser exibida uma mensagem de obrigatoriedade do campo "<campo>"

    Exemplos:
      | campo    |
      | email    |
      | password |

  @negative
  Esquema do Cenário: Login com credenciais inválidas
    Dado que possuo uma conta cadastrada
    Quando tento realizar login com "<condicao>"
    Então o login deve ser recusado

    Exemplos:
      | condicao             |
      | email não cadastrado |
      | senha incorreta      |
