import { faker } from "@faker-js/faker";

import { usuarioFactory } from "../factories/usuario.factory";

import type { Usuario } from "../types/usuario.types";
import type { ContaStorage, TransacaoStorage } from "../types/conta.types";

export interface UsuarioPreparado {
  usuario: Usuario;
  accountNumber: string;
}

interface ConfiguracaoUsuario {
  overrides?: Partial<Usuario>;
  saldoInicial?: number;
}

export function prepararUsuariosStorage(configuracoes: ConfiguracaoUsuario[]): UsuarioPreparado[] {
  if (configuracoes.length === 0) {
    throw new Error("Informe pelo menos um usuário.");
  }

  const numerosGerados = new Set<string>();
  const emailsGerados = new Set<string>();

  const contas = configuracoes.map((configuracao) => {
    const usuario = usuarioFactory(configuracao.overrides);

    const saldoInicial = configuracao.saldoInicial ?? (usuario.isSaldo ? 1000 : 0);

    if (!Number.isFinite(saldoInicial) || saldoInicial < 0) {
      throw new Error("O saldo inicial deve ser um número não negativo.");
    }

    if (emailsGerados.has(usuario.email)) {
      throw new Error(`E-mail duplicado: ${usuario.email}`);
    }

    emailsGerados.add(usuario.email);

    let accountNumber: string;

    do {
      accountNumber = `${faker.number.int({
        min: 100,
        max: 999,
      })}-${faker.number.int({ min: 0, max: 9 })}`;
    } while (numerosGerados.has(accountNumber));

    numerosGerados.add(accountNumber);

    const conta: ContaStorage = {
      name: usuario.name,
      email: usuario.email,
      password: usuario.password,
      accountNumber,
      balance: saldoInicial,
      logged: false,
    };

    const transacoes: TransacaoStorage[] =
      saldoInicial > 0
        ? [
            {
              id: faker.string.uuid(),
              date: new Date().toLocaleDateString("pt-BR"),
              type: "Abertura de conta",
              transferValue: saldoInicial,
              description: "Saldo adicionado ao abrir conta",
            },
          ]
        : [];

    return {
      usuario,
      accountNumber,
      conta,
      transacoes,
    };
  });

  cy.visit("/", {
    onBeforeLoad(win) {
      contas.forEach(({ usuario, conta, transacoes }) => {
        win.localStorage.setItem(usuario.email, JSON.stringify(conta));

        win.localStorage.setItem(`transaction:${usuario.email}`, JSON.stringify(transacoes));
      });
    },
  });

  cy.window().then((win) => {
    contas.forEach(({ usuario, conta }) => {
      const raw = win.localStorage.getItem(usuario.email);

      if (raw === null) {
        throw new Error(`Conta não encontrada no localStorage: ${usuario.email}`);
      }

      const contaSalva: ContaStorage = JSON.parse(raw);

      expect(contaSalva).to.deep.equal(conta);
    });
  });

  return contas.map(({ usuario, accountNumber }) => ({
    usuario,
    accountNumber,
  }));
}

export function prepararUsuarioStorage(overrides: Partial<Usuario> = {}): UsuarioPreparado {
  const [conta] = prepararUsuariosStorage([
    {
      overrides,
    },
  ]);

  return conta;
}
