import { faker } from "@faker-js/faker";
import type { Usuario } from "../types/usuario.types";

export function usuarioFactory(overrides: Partial<Usuario> = {}): Usuario {
  const password = faker.internet.password({ length: 12 });

  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    password,
    confirmPassword: password,
    isSaldo: true,
    ...overrides,
  };
}
