import { extratoElements, homeElements } from "../elements";
import { converterMoedaParaNumero } from "../utils/formatacao.utils";

interface TransacaoEsperada {
  data?: string;
  tipo: string;
  descricao: string;
  valor: number;
}

interface DadosTransacao {
  tipo: string;
  descricao: string;
}

class ExtratoPage {
  private obterDadosTransacao(card: HTMLElement): DadosTransacao {
    const elemento = Cypress.$(card);

    return {
      tipo: elemento.find(extratoElements.transactionType).text().trim(),
      descricao: elemento.find(extratoElements.transactionDescription).text().trim(),
    };
  }

  private localizarTransacao(transacao: TransacaoEsperada) {
    return cy
      .get(extratoElements.transactionCard)
      .filter((_, card) => {
        const dados = this.obterDadosTransacao(card);

        return dados.tipo === transacao.tipo && dados.descricao === transacao.descricao;
      })
      .should("have.length.at.least", 1)
      .first();
  }

  private validarInformacoes(transacao: TransacaoEsperada): void {
    cy.get(extratoElements.transactionType).should("have.text", transacao.tipo);

    cy.get(extratoElements.transactionDescription).should("have.text", transacao.descricao);

    if (transacao.data) {
      cy.get(extratoElements.transactionDate).should("have.text", transacao.data);
    }
  }

  private validarValor(valorEsperado: number): void {
    cy.get(extratoElements.transactionValue)
      .invoke("text")
      .then((texto) => {
        const valorAtual = converterMoedaParaNumero(texto);

        expect(valorAtual, "Valor da transação").to.equal(valorEsperado);
      });
  }

  validarTransacao(transacao: TransacaoEsperada): void {
    this.localizarTransacao(transacao).within(() => {
      this.validarInformacoes(transacao);
      this.validarValor(transacao.valor);
    });
  }

  clicarMenuExtrato(): void {
    cy.get(homeElements.extratoMenuButton).click();
  }
}

export default new ExtratoPage();
