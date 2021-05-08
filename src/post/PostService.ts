import { PostParams, PostRepository, PostType } from ".";
import { ComentarioRepository } from "../comentario";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import { ERRO_VOTO_INVALIDO } from "../common/mensagens";
import { validarCamposObrigatorios } from "../common/validadores";
import { OpcaoVoto, Voto } from "../voto";

export default class PostService {
  public listar(): PostType[] {
    return new PostRepository().listar();
  }

  public listarPorCategoria(pathCategoria: string): PostType[] {
    return new PostRepository()
      .listar()
      .filter((p) => p.categoria === pathCategoria);
  }

  public obterPorId = (id: string): PostType => {
    const post = new PostRepository().obterPorId(id);
    if (!post) {
      throw new ErroRegistroInexistente(id);
    }
    return post;
  };

  public validarExistenciaPost = (id: string) => {
    this.obterPorId(id);
  };

  public criar = (post: PostParams): PostType => {
    validarCamposObrigatorios(post);

    const novoPost = {
      ...post,
      timestamp: Date.now(),
      nota: 0,
      numeroComentarios: 0,
    };

    return new PostRepository().salvar(novoPost);
  };

  public atualizar = (id: string, post: PostParams): PostType => {
    validarCamposObrigatorios({ id, ...post });

    const repository = new PostRepository();

    const postExistente = repository.obterPorId(id);
    if (!postExistente || !postExistente.id) {
      throw new ErroRegistroInexistente(id);
    }

    return repository.salvar({ ...postExistente, ...post });
  };

  public votar = (id: string, voto: Voto): PostType => {
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
}
