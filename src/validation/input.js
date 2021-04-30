import { posts } from '../db/posts';
import { ErroCampoObrigatorio, ErroRegistroInexistente } from './erros';

export const validarExistenciaPost = id => validarExistenciaRegistro(id, posts);
export const validarExistenciaRegistro = (id, objeto) => {
  if (!objeto[id] || objeto[id].excluido) {
    throw new ErroRegistroInexistente(id);
  }
};

export const validarCamposObrigatorios = campos => {
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
