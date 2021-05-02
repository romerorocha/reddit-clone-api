import { comentarios } from "../db/comentarios";
import { posts } from "../db/posts";
import { ErroCampoObrigatorio, ErroRegistroInexistente } from "./erros";

export const validarExistenciaComentario = (id: string) => {
  return validarExistenciaRegistro(id, comentarios);
};

export const validarExistenciaRegistro = (id: string, objeto: any) => {
  if (!objeto[id] || objeto[id].excluido) {
    throw new ErroRegistroInexistente(id);
  }
};

export const validarCamposObrigatorios = (...campos: any) => {
  const nomes = [];
  for (const key in campos) {
    if (!campos[key]) {
      nomes.push("'" + key + "'");
    }
  }

  if (nomes.length) {
    throw new ErroCampoObrigatorio(nomes);
  }
};
