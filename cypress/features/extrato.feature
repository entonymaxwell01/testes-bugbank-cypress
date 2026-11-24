# language: pt
@extrato
@regression
Funcionalidade: Extrato bancário
  Como um cliente devidamente autenticado no sistema
  Quero consultar minhas movimentações
  Para acompanhar as operações da conta

  @smoke
  Cenário: Consultar extrato após uma transferência
    Dado que possuo duas contas bancárias cadastradas
    E realizei uma transferência de 200 reais
    Quando acesso o extrato da minha conta
    Então devo visualizar o registro da transferência realizada
    E o valor da movimentação deve ser de 200 reais
