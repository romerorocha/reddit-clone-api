import { PostParams, PostRepository, PostsPage, UserPost } from ".";

import { ComentarioRepository } from "comentario";

import { ErroRegistroInexistente } from "common/erros";
import { OpcaoVoto, Voto } from "common/types";

export class PostService {
  readonly repository: PostRepository;
  readonly comentarioRepository: ComentarioRepository;

  constructor() {
    this.repository = new PostRepository();
    this.comentarioRepository = new ComentarioRepository();
  }

  public listar(): UserPost[] {
    return this.repository.listar();
  }

  public listarPorCategoria(pathCategoria: string): UserPost[] {
    return this.repository
      .listar()
      .filter((p) => p.categoria === pathCategoria);
  }

  public listarPaginado(
    pagina: number,
    tamanho: number,
    pathCategoria?: string
  ): PostsPage {
    const posts = pathCategoria
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

  public obterPorId = (id: string): UserPost => {
    const post = this.repository.obterPorId(id);
    if (!post) {
      throw new ErroRegistroInexistente(id);
    }
    return post;
  };

  public criar = (post: PostParams): UserPost => {
    const novoPost = {
      ...post,
      timestamp: Date.now(),
      nota: 0,
      numeroComentarios: 0,
    };

    return this.repository.salvar(novoPost);
  };

  public atualizar = (id: string, post: PostParams): UserPost => {
    const postExistente = this.repository.obterPorId(id);
    if (!postExistente || !postExistente.id) {
      throw new ErroRegistroInexistente(id);
    }

    return this.repository.salvar({ ...postExistente, ...post });
  };

  public votar = (id: string, voto: Voto): UserPost => {
    const post = this.repository.obterPorId(id);
    if (!post?.id) {
      throw new ErroRegistroInexistente(id);
    }

    const incremento = voto.opcao === OpcaoVoto.positivo ? 1 : -1;
    return this.repository.salvar({ ...post, nota: post.nota + incremento });
  };

  public excluir = (id: string): string => {
    this.obterPorId(id);
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
