import { CadastroPage } from "../pages";
import { usuarioFactory } from "../factories/usuario.factory";
import type { Usuario } from "../types/usuario.types";

export function cadastrarUsuario(overrides: Partial<Usuario> = {}): Usuario {
  const usuario = usuarioFactory(overrides);

  CadastroPage.goTo();
  CadastroPage.abrirFormularioCadastro();
  CadastroPage.preencherFormulario(usuario);
  CadastroPage.confirmarCadastro();
  CadastroPage.validarCadastro("foi criada com sucesso");

  return usuario;
}
