import { ComentarioService } from "../comentario/comentario.service";
import { v1 as uuidv1 } from "uuid";
import { OpcaoVoto, Voto } from "../voto/voto";
import { ERRO_VOTO_INVALIDO } from "../common/mensagens";
import { posts } from "./posts.db";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import { validarCamposObrigatorios } from "../common/validacao.util";
import { Post } from "./post";

export type PostParams = Pick<Post, "titulo" | "corpo" | "autor" | "categoria">;

export class PostService {
  public listar(): Post[] {
    return Object.values(posts);
  }

  public listarPorCategoria(pathCategoria: string): Post[] {
    return this.listar().filter((p) => p.categoria === pathCategoria);
  }

  public obterPorId = (id: string): Post => {
    this.validarExistenciaPost(id);
    return posts[id];
  };

  public criar = (post: PostParams): Post => {
    validarCamposObrigatorios(post);

    const id = uuidv1();
    posts[id] = {
      id,
      timestamp: Date.now(),
      ...post,
      nota: 0,
      numeroComentarios: 0,
    };

    return posts[id];
  };

  public atualizar = (id: string, post: PostParams): Post => {
    validarCamposObrigatorios({ id, ...post });
    this.validarExistenciaPost(id);

    posts[id] = { ...posts[id], ...post };
    return posts[id];
  };

  public votar = (id: string, voto: Voto): Post => {
    validarCamposObrigatorios(id);
    this.validarExistenciaPost(id);

    const post = posts[id];
    switch (voto.opcao) {
      case OpcaoVoto.Positivo:
        post.nota++;
        break;
      case OpcaoVoto.Negativo:
        post.nota--;
        break;
      default:
        throw new ErroValidacao(ERRO_VOTO_INVALIDO);
    }

    return post;
  };

  public excluir = (id: string): string => {
    validarCamposObrigatorios(id);
    this.validarExistenciaPost(id);

    new ComentarioService().excluirListaComentarios(id);
    delete posts[id];

    return id;
  };

  public atualizarContadorComentarios = (id: string, incremento: number) => {
    if (posts[id]) {
      const atual = posts[id].numeroComentarios || 0;
      posts[id].numeroComentarios = atual + incremento;
    }
  };

  public validarExistenciaPost = (id: string) => {
    if (!posts[id]) {
      throw new ErroRegistroInexistente(id);
    }
  };
}
