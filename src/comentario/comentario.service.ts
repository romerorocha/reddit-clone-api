import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import { ERRO_VOTO_INVALIDO } from "../common/mensagens";
import { validarCamposObrigatorios } from "../common/validacao.util";
import { PostService } from "../post/post.service";
import { OpcaoVoto, Voto } from "../voto/voto";
import { Comentario } from "./comentario";
import { ComentarioRepository } from "./comentario.repository";

export type ComentarioParams = Pick<Comentario, "autor" | "corpo">;

export class ComentarioService {
  public listar(idPai: string): Comentario[] {
    validarCamposObrigatorios(idPai);
    return new ComentarioRepository().listar(idPai);
  }

  public criar = (idPai: string, comentario: ComentarioParams) => {
    validarCamposObrigatorios(comentario);

    const postService = new PostService();
    postService.validarExistenciaPost(idPai);
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
    this.validarExistenciaComentario(id);

    const repository = new ComentarioRepository();
    const comentarioExistente = repository.obter(id);

    return repository.salvar({ ...comentarioExistente, ...comentario });
  };

  public votar = (id: string, voto: Voto) => {
    validarCamposObrigatorios(id);
    this.validarExistenciaComentario(id);

    const repository = new ComentarioRepository();
    const comentario = repository.obter(id);

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

    return repository.salvar(comentario);
  };

  public excluir = (id: string): string => {
    validarCamposObrigatorios(id);

    const repository = new ComentarioRepository();

    const comentario = repository.obter(id);
    if (!comentario || !comentario.id) {
      throw new ErroRegistroInexistente(id);
    }

    new PostService().atualizarContadorComentarios(comentario.idPai, -1);

    return repository.excluir(id);
  };

  validarExistenciaComentario(id: string) {
    const comentario = new ComentarioRepository().obter(id);
    if (!comentario || !comentario.id) {
      throw new ErroRegistroInexistente(id);
    }
  }
}
