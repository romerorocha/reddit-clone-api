import { ComentarioParams, ComentarioRepository, Comentario } from ".";

import { ErroRegistroInexistente, ErroValidacao } from "common/erros";
import { ERRO_VOTO_INVALIDO } from "common/mensagens";
import { validarCamposObrigatorios } from "common/validadores";
import { OpcaoVoto, Voto } from "common/types";

import { PostService } from "post";

export class ComentarioService {
  private obterOuLancarExcecao(id: string): Comentario {
    const comentario = new ComentarioRepository().obter(id);
    if (!comentario || !comentario.id) {
      throw new ErroRegistroInexistente(id);
    }
    return comentario;
  }

  public listar(idPai: string): Comentario[] {
    validarCamposObrigatorios(idPai);
    return new ComentarioRepository().listar(idPai);
  }

  public criar = (idPai: string, comentario: ComentarioParams) => {
    validarCamposObrigatorios(comentario);

    const postService = new PostService();
    postService.obterPorId(idPai);

    postService.atualizarContadorComentarios(idPai, 1);

    return new ComentarioRepository().salvar({
      idPai,
      timestamp: Date.now(),
      corpo: comentario.corpo,
      autor: comentario.autor,
      nota: 0,
    });
  };

  public atualizar = (id: string, comentario: ComentarioParams) => {
    validarCamposObrigatorios({ id, ...comentario });
    const comentarioExistente = this.obterOuLancarExcecao(id);
    return new ComentarioRepository().salvar({
      ...comentarioExistente,
      ...comentario,
    });
  };

  public votar = (id: string, voto: Voto) => {
    validarCamposObrigatorios(id);
    const comentario = this.obterOuLancarExcecao(id);

    switch (voto.opcao) {
      case OpcaoVoto.positivo:
        comentario.nota++;
        break;
      case OpcaoVoto.negativo:
        comentario.nota--;
        break;
      default:
        throw new ErroValidacao(ERRO_VOTO_INVALIDO);
    }

    return new ComentarioRepository().salvar(comentario);
  };

  public excluir = (id: string): string => {
    validarCamposObrigatorios(id);
    const comentario = this.obterOuLancarExcecao(id);
    new PostService().atualizarContadorComentarios(comentario.idPai, -1);
    return new ComentarioRepository().excluir(id);
  };
}
