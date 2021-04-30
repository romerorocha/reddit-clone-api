import {
  ERRO_CATEGORIA_JA_EXISTE,
  ERRO_CATEGORIA_POSSUI_POSTS,
} from '../config/messages';
import { categorias } from '../db/categorias';
import { ErroRegistroInexistente, ErroValidacao } from '../validation/erros';
import { validarCamposObrigatorios } from '../validation/input';
import * as postService from './post';
import { obterAtivos } from './util';

export const listar = () => obterAtivos(categorias);

export const criar = (nome, path) => {
  validarCamposObrigatorios(nome, path);
  if (categorias[path]) {
    throw new ErroValidacao(ERRO_CATEGORIA_JA_EXISTE);
  }
  categorias[path] = { nome, path };
  return categorias[path];
};

export const excluir = path => {
  validarCamposObrigatorios(path);
  if (!categorias[path] || categorias[path].excluido) {
    throw new ErroRegistroInexistente(path);
  }

  const postCategoria = postService.listarPorCategoria(path);
  if (postCategoria.length) {
    throw new ErroValidacao(ERRO_CATEGORIA_POSSUI_POSTS);
  }

  categorias[path].excluido = true;
  return categorias[path];
};
