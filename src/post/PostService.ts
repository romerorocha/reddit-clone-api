import { PostParams, PostRepository, PostsPage, PostType } from ".";
import { ComentarioRepository } from "../comentario";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import { ERRO_VOTO_INVALIDO } from "../common/mensagens";
import { validarCamposObrigatorios } from "../common/validadores";
import { OpcaoVoto, Voto } from "../voto";

export default class PostService {
  readonly repository: PostRepository;
  readonly comentarioRepository: ComentarioRepository;

  constructor() {
    this.repository = new PostRepository();
    this.comentarioRepository = new ComentarioRepository();
  }

  public listar(): PostType[] {
    return this.repository.listar();
  }

  public listarPorCategoria(pathCategoria: string): PostType[] {
    return this.repository
      .listar()
      .filter((p) => p.categoria === pathCategoria);
  }

  public listarPaginado(
    pagina: number,
    tamanho: number,
    pathCategoria?: string
  ): PostsPage {
    const posts = !!pathCategoria
      ? this.listarPorCategoria(pathCategoria)
      : this.listar();

    const inicio = pagina * tamanho;
    const fim = inicio + tamanho;

    return {
      posts: posts.slice(inicio, fim),
      pagina,
      tamanho: tamanho,
      total: posts.length,
    };
  }

  public obterPorId = (id: string): PostType => {
    const post = this.repository.obterPorId(id);
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

    return this.repository.salvar(novoPost);
  };

  public atualizar = (id: string, post: PostParams): PostType => {
    validarCamposObrigatorios({ id, ...post });

    const postExistente = this.repository.obterPorId(id);
    if (!postExistente || !postExistente.id) {
      throw new ErroRegistroInexistente(id);
    }

    return this.repository.salvar({ ...postExistente, ...post });
  };

  public votar = (id: string, voto: Voto): PostType => {
    validarCamposObrigatorios(id);

    if (!Object.keys(OpcaoVoto).includes(voto.opcao)) {
      throw new ErroValidacao(ERRO_VOTO_INVALIDO);
    }

    const post = this.repository.obterPorId(id);
    if (!post?.id) {
      throw new ErroRegistroInexistente(id);
    }

    const incremento = voto.opcao === OpcaoVoto.positivo ? 1 : -1;
    return this.repository.salvar({ ...post, nota: post.nota + incremento });
  };

  public excluir = (id: string): string => {
    validarCamposObrigatorios(id);
    this.validarExistenciaPost(id);
    this.comentarioRepository.excluirPorPai(id);
    return this.repository.excluir(id);
  };

  public atualizarContadorComentarios = (id: string, incremento: number) => {
    const post = this.repository.obterPorId(id);

    if (post?.id) {
      const numeroComentarios = post.numeroComentarios + incremento;
      this.repository.salvar({ ...post, numeroComentarios });
    }
  };
}
