import { v1 as uuidv1 } from "uuid";
import { ERRO_VOTO_INVALIDO } from "../config/messages";
import { comentarios } from "../db/comentarios";
import { ErroValidacao } from "../validation/erros";
import {
  validarCamposObrigatorios,
  validarExistenciaComentario,
  validarExistenciaPost,
} from "../validation/input";
import { atualizarContadorComentarios } from "./post";

export const listar = (idPai) => {
  validarCamposObrigatorios(idPai);

  return Object.values(comentarios).filter(
    (c) => c.idPai === idPai && !c.excluido && !c.paiExcluido
  );
};

export const criar = ({ corpo, autor, idPai }) => {
  validarCamposObrigatorios({ corpo, autor, idPai });
  validarExistenciaPost(idPai);

  atualizarContadorComentarios(idPai, 1);

  const id = uuidv1();
  comentarios[id] = {
    id,
    timestamp: Date.now(),
    corpo,
    autor,
    nota: 0,
    excluido: false,
    paiExcluido: false,
  };

  return comentarios[id];
};

export const atualizar = (id, { corpo }) => {
  validarCamposObrigatorios({ id, corpo });
  validarExistenciaComentario(id);

  comentarios[id] = { ...comentarios[id], corpo };
  return comentarios[id];
};

export const votar = (id, opcao) => {
  validarCamposObrigatorios(id);
  validarExistenciaComentario(id);

  const comentario = comentarios[id];
  switch (opcao) {
    case "positivo":
      comentario.nota++;
      break;
    case "negativo":
      comentario.nota--;
      break;
    default:
      throw new ErroValidacao(ERRO_VOTO_INVALIDO);
  }
  return comentario;
};

export const excluir = (id) => {
  validarCamposObrigatorios(id);
  validarExistenciaComentario(id);

  const comentario = comentarios[id];
  atualizarContadorComentarios(comentario.idPai, -1);
  comentario.excluido = true;
  return comentario;
};

export const atualizarFilhosExclusaoPai = (idPai) => {
  validarCamposObrigatorios(idPai);
  for (const c of Object.values(comentarios)) {
    if (c.idPai === idPai) {
      c.paiExcluido = true;
    }
  }
};
