import { v1 as uuidv1 } from 'uuid';
import { ERRO_VOTO_INVALIDO } from '../config/messages';
import { posts } from '../db/posts';
import { ErroValidacao } from '../validation/erros';
import {
  validarCamposObrigatorios,
  validarExistenciaPost,
} from '../validation/input';
import { atualizarFilhosExclusaoPai } from './comentario';
import { obterAtivos } from './util';

export const listar = () => obterAtivos(posts);

export const listarPorCategoria = categoria => {
  return listar().filter(p => p.categoria === categoria);
};

export const obterPorId = id => {
  validarExistenciaPost(id);
  return posts[id];
};

export const criar = ({ titulo, corpo, autor, categoria }) => {
  validarCamposObrigatorios({ titulo, corpo, autor, categoria });

  const id = uuidv1();
  posts[id] = {
    id,
    timestamp: Date.now(),
    titulo,
    corpo,
    autor,
    categoria,
    nota: 0,
    excluido: false,
    numeroComentarios: 0,
  };

  return posts[id];
};

export const atualizar = (id, { titulo, corpo, autor, categoria }) => {
  validarCamposObrigatorios({ id, titulo, corpo, autor, categoria });
  validarExistenciaPost(id);

  posts[id] = { ...posts[id], titulo, corpo, autor, categoria };
  return posts[id];
};

export const votar = (id, opcao) => {
  validarCamposObrigatorios(id);
  validarExistenciaPost(id);

  const post = posts[id];
  switch (opcao) {
    case 'positivo':
      post.nota++;
      break;
    case 'negativo':
      post.nota--;
      break;
    default:
      throw new ErroValidacao(ERRO_VOTO_INVALIDO);
  }
  return post;
};

export const excluir = id => {
  validarCamposObrigatorios(id);
  validarExistenciaPost(id);

  atualizarFilhosExclusaoPai(id);
  posts[id].excluido = true;
  return posts[id];
};

export const atualizarContadorComentarios = (id, quantidade) => {
  if (posts[id]) {
    posts[id].numeroComentarios += quantidade;
  }
};
