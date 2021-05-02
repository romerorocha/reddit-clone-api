import {
  ERRO_CATEGORIA_JA_EXISTE,
  ERRO_CATEGORIA_POSSUI_POSTS,
} from "../config/messages";
import { categorias } from "../db/categorias";
import { Categoria, Categorias } from "../model/categoria";
import { ErroRegistroInexistente, ErroValidacao } from "../validation/erros";
import { validarCamposObrigatorios } from "../validation/input";
import * as postService from "./post";

export const listar = (): Categoria[] => Object.values(categorias);

export const criar = (categoria: Categoria): Categoria => {
  const { path, nome } = categoria;

  validarCamposObrigatorios(nome, path);
  if (categorias[path]) {
    throw new ErroValidacao(ERRO_CATEGORIA_JA_EXISTE);
  }

  categorias[path] = categoria;
  return categorias[path];
};

export const excluir = (path: string): string => {
  validarCamposObrigatorios(path);

  if (!categorias[path]) {
    throw new ErroRegistroInexistente(path);
  }

  const postCategoria = postService.listarPorCategoria(path);
  if (postCategoria.length) {
    throw new ErroValidacao(ERRO_CATEGORIA_POSSUI_POSTS);
  }

  delete categorias[path];

  return path;
};
