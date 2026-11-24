# language: pt
@transferencia
@regression
Funcionalidade: Transferência bancária
  Como um cliente devidamente autenticado no sistema
  Quero poder realizar transferencias a partir da minha conta bancária

  @smoke
  Cenário: Transferência entre contas com saldo suficiente
    Dado que possuo uma conta com saldo disponível
    E existe uma conta destinatária cadastrada
    Quando realizo uma transferência de 200 reais
    Então a transferência deve ser concluída com sucesso
    E o saldo das contas deve ser atualizado corretamente
