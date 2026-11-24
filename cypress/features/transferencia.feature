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

  @negative
  Cenário: Transferência entre contas com saldo insuficiente
    Dado que possuo uma conta com saldo disponível
    E existe uma conta destinatária cadastrada
    Quando realizo uma transferência de 1500 reais
    Então a transferência deve ser recusada com a mensagem "Você não tem saldo suficiente para essa transação"
    E os saldos das contas devem permanecer inalterados

  @negative
  Cenário: Transferência para conta inexistente
    Dado que possuo uma conta com saldo disponível
    Quando realizo uma transferência de 200 reais para uma conta inexistente
    Então a transferência deve ser recusada com a mensagem "Conta inválida ou inexistente"
    E os saldos das contas devem permanecer inalterados

  @negative
  Esquema do Cenário: Transferência com valor inválido
    Dado que possuo uma conta com saldo disponível
    E existe uma conta destinatária cadastrada
    Quando realizo uma transferência de <valor> reais
    Então a transferência deve ser recusada com a mensagem "Valor da transferência não pode ser 0 ou negativo"
    E os saldos das contas devem permanecer inalterados

    Exemplos:
      | valor |
      | 0     |
      | -10   |
