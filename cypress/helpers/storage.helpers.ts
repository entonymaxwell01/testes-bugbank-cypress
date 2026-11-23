import { faker } from "@faker-js/faker";

import { usuarioFactory } from "../factories/usuario.factory";
import type { Usuario } from "../types/usuario.types";
import type { ContaStorage, TransacaoStorage } from "../types/conta.types";

interface UsuarioPreparado {
  usuario: Usuario;
  accountNumber: string;
}

export function prepararUsuarioStorage(overrides: Partial<Usuario> = {}): UsuarioPreparado {
  const usuario = usuarioFactory(overrides);

  const accountNumber = `${faker.number.int({
    min: 100,
    max: 999,
  })}-${faker.number.int({ min: 0, max: 9 })}`;

  const saldoInicial = usuario.isSaldo ? 1000 : 0;

  const conta: ContaStorage = {
    name: usuario.name,
    email: usuario.email,
    password: usuario.password,
    accountNumber,
    balance: saldoInicial,
    logged: false,
  };

  cy.visit("/", {
    onBeforeLoad(win) {
      win.localStorage.setItem(usuario.email, JSON.stringify(conta));

      if (usuario.isSaldo) {
        const transacao: TransacaoStorage = {
          id: win.crypto.randomUUID(),
          date: new Date().toLocaleDateString("pt-BR"),
          type: "Abertura de conta",
          transferValue: saldoInicial,
          description: "Saldo adicionado ao abrir conta",
        };

        win.localStorage.setItem(`transaction:${usuario.email}`, JSON.stringify([transacao]));
      }
    },
  });

  return {
    usuario,
    accountNumber,
  };
}
