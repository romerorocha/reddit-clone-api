import { v1 as uuidv1 } from "uuid";
import { Voto } from "../common/enums";
import { ERRO_VOTO_INVALIDO } from "../config/messages";
import { posts } from "../db/posts";
import { BasePost, Post } from "../model/post";
import { ErroRegistroInexistente, ErroValidacao } from "../validation/erros";
import { validarCamposObrigatorios } from "../validation/input";
import { excluirListaComentarios } from "./comentario";

export const listar = (): Post[] => Object.values(posts);

export const listarPorCategoria = (pathCategoria: string): Post[] => {
  return listar().filter((p) => p.categoria === pathCategoria);
};

export const obterPorId = (id: string): Post => {
  validarExistenciaPost(id);
  return posts[id];
};

export const criar = (post: BasePost): Post => {
  validarCamposObrigatorios(post);

  const id = uuidv1();
  posts[id] = {
    id,
    timestamp: Date.now(),
    ...post,
    nota: 0,
    numeroComentarios: 0,
  };

  return posts[id];
};

export const atualizar = (id: string, post: BasePost): Post => {
  validarCamposObrigatorios({ id, ...post });
  validarExistenciaPost(id);

  posts[id] = { ...posts[id], ...post };
  return posts[id];
};

export const votar = (id: string, opcao: string): Post => {
  validarCamposObrigatorios(id);
  validarExistenciaPost(id);

  const post = posts[id];
  post.nota = post.nota || 0;

  switch (opcao) {
    case Voto.Positivo:
      post.nota++;
      break;
    case Voto.Negativo:
      post.nota--;
      break;
    default:
      throw new ErroValidacao(ERRO_VOTO_INVALIDO);
  }

  return post;
};

export const excluir = (id: string): string => {
  validarCamposObrigatorios(id);
  validarExistenciaPost(id);

  excluirListaComentarios(id);
  const post = posts[id];
  delete posts[id];

  return id;
};

export const atualizarContadorComentarios = (
  id: string,
  incremento: number
) => {
  if (posts[id]) {
    const atual = posts[id].numeroComentarios || 0;
    posts[id].numeroComentarios = atual + incremento;
  }
};

const validarExistenciaPost = (id: string) => {
  if (!posts[id]) {
    throw new ErroRegistroInexistente(id);
  }
};
