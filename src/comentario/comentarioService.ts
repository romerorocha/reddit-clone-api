import { OpcaoVoto, Voto } from "src/common/voto";
import { v1 as uuidv1 } from "uuid";
import { ERRO_VOTO_INVALIDO } from "../common/messages";
import { comentarios } from "./comentariosDB";
import { PostService } from "../post/postService";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import {
  validarCamposObrigatorios,
  validarExistenciaRegistro,
} from "../common/validation";
import { Comentario } from "./comentario";

export type ComentarioParams = Pick<Comentario, "autor" | "corpo">;

export class ComentarioService {
  public listar(idPai: string): Comentario[] {
    validarCamposObrigatorios(idPai);

    return Object.values(comentarios);
  }

  public criar = (idPai: string, comentario: ComentarioParams) => {
    validarCamposObrigatorios(comentario);

    const postService = new PostService();
    postService.validarExistenciaPost(idPai);

    postService.atualizarContadorComentarios(idPai, 1);

    const id = uuidv1();
    comentarios[id] = {
      id,
      idPai,
      timestamp: Date.now(),
      corpo: comentario.corpo,
      autor: comentario.autor,
      nota: 0,
    };

    return comentarios[id];
  };

  public atualizar = (id: string, comentario: ComentarioParams) => {
    validarCamposObrigatorios({ id, ...comentario });
    this.validarExistenciaComentario(id);

    comentarios[id] = { ...comentarios[id], ...comentario };
    return comentarios[id];
  };

  public votar = (id: string, voto: Voto) => {
    validarCamposObrigatorios(id);
    this.validarExistenciaComentario(id);

    const comentario = comentarios[id];
    switch (voto.opcao) {
      case OpcaoVoto.Positivo:
        comentario.nota++;
        break;
      case OpcaoVoto.Negativo:
        comentario.nota--;
        break;
      default:
        throw new ErroValidacao(ERRO_VOTO_INVALIDO);
    }
    return comentario;
  };

  public excluir = (id: string): Comentario => {
    validarCamposObrigatorios(id);

    const comentario = comentarios[id];
    if (!comentario) {
      throw new ErroRegistroInexistente(id);
    }

    new PostService().atualizarContadorComentarios(comentario.idPai, -1);
    delete comentarios[id];

    return comentario;
  };

  public excluirListaComentarios = (idPai: string) => {
    validarCamposObrigatorios(idPai);

    for (const id in comentarios) {
      if (comentarios[id].idPai === idPai) {
        delete comentarios[id];
      }
    }
  };

  validarExistenciaComentario(id: string) {
    return validarExistenciaRegistro(id, comentarios);
  }
}
