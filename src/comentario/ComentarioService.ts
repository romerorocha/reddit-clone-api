import { ComentarioParams, ComentarioRepository, Comentario } from ".";

import { ErroRegistroInexistente, ErroValidacao } from "common/erros";
import { ERRO_VOTO_INVALIDO } from "common/mensagens";
import { OpcaoVoto, Voto } from "common/types";

import { PostService } from "post";

export class ComentarioService {
  readonly repository: ComentarioRepository;
  readonly postService: PostService;

  constructor() {
    this.repository = new ComentarioRepository();
    this.postService = new PostService();
  }

  private obterPorId(id: string): Comentario {
    const comentario = this.repository.obter(id);
    if (!comentario || !comentario.id) {
      throw new ErroRegistroInexistente(id);
    }
    return comentario;
  }

  public listar(idPai: string): Comentario[] {
    return this.repository.listar(idPai);
  }

  public criar = (idPai: string, comentario: ComentarioParams) => {
    this.postService.obterPorId(idPai);
    this.postService.atualizarContadorComentarios(idPai, 1);

    return this.repository.salvar({
      idPai,
      timestamp: Date.now(),
      corpo: comentario.corpo,
      autor: comentario.autor,
      nota: 0,
    });
  };

  public atualizar = (id: string, comentario: ComentarioParams) => {
    const comentarioExistente = this.obterPorId(id);
    return this.repository.salvar({
      ...comentarioExistente,
      ...comentario,
    });
  };

  public votar = (id: string, voto: Voto) => {
    const comentario = this.obterPorId(id);

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

    return this.repository.salvar(comentario);
  };

  public excluir = (id: string): string => {
    const comentario = this.obterPorId(id);
    this.postService.atualizarContadorComentarios(comentario.idPai, -1);
    return this.repository.excluir(id);
  };
}
