import { ComentarioRepository } from "../comentario/comentario.repository";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import { ERRO_VOTO_INVALIDO } from "../common/mensagens";
import { validarCamposObrigatorios } from "../common/validacao.util";
import { OpcaoVoto, Voto } from "../voto/voto";
import { IPost } from "./post";
import { PostRepository, posts } from "./post.repository";

export type PostParams = Pick<
  IPost,
  "titulo" | "corpo" | "autor" | "categoria"
>;

export class PostService {
  public listar(): IPost[] {
    return new PostRepository().listar();
  }

  public listarPorCategoria(pathCategoria: string): IPost[] {
    return new PostRepository()
      .listar()
      .filter((p) => p.categoria === pathCategoria);
  }

  public obterPorId = (id: string): IPost => {
    this.validarExistenciaPost(id);
    return new PostRepository().obterPorId(id);
  };

  public criar = (post: PostParams): IPost => {
    validarCamposObrigatorios(post);

    const novoPost = {
      ...post,
      timestamp: Date.now(),
      nota: 0,
      numeroComentarios: 0,
    };

    return new PostRepository().salvar(novoPost);
  };

  public atualizar = (id: string, post: PostParams): IPost => {
    validarCamposObrigatorios({ id, ...post });

    const repository = new PostRepository();

    const postExistente = repository.obterPorId(id);
    if (!postExistente || !postExistente.id) {
      throw new ErroRegistroInexistente(id);
    }

    return repository.salvar({ ...postExistente, ...post });
  };

  public votar = (id: string, voto: Voto): IPost => {
    validarCamposObrigatorios(id);

    const repository = new PostRepository();

    const postExistente = repository.obterPorId(id);
    if (!postExistente || !postExistente.id) {
      throw new ErroRegistroInexistente(id);
    }

    let nota;
    switch (voto.opcao) {
      case OpcaoVoto.Positivo:
        nota = postExistente.nota + 1;
        break;
      case OpcaoVoto.Negativo:
        nota = postExistente.nota - 1;
        break;
      default:
        throw new ErroValidacao(ERRO_VOTO_INVALIDO);
    }

    return repository.salvar({ ...postExistente, nota });
  };

  public excluir = (id: string): string => {
    validarCamposObrigatorios(id);
    this.validarExistenciaPost(id);

    new ComentarioRepository().excluirPorPai(id);
    return new PostRepository().excluir(id);

    return id;
  };

  public atualizarContadorComentarios = (id: string, incremento: number) => {
    const repository = new PostRepository();

    const postExistente = repository.obterPorId(id);

    if (postExistente && postExistente.id) {
      repository.salvar({
        ...postExistente,
        numeroComentarios: postExistente.numeroComentarios + incremento,
      });
    }
  };

  public validarExistenciaPost = (id: string) => {
    if (!posts[id]) {
      throw new ErroRegistroInexistente(id);
    }
  };
}
