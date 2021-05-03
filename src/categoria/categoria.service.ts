import {
  ERRO_CATEGORIA_JA_EXISTE,
  ERRO_CATEGORIA_POSSUI_POSTS,
} from "../common/mensagens";
import { categorias } from "./categorias.db";
import { PostService } from "../post/post.service";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import { validarCamposObrigatorios } from "../common/validacao.util";
import { Categoria } from "./categoria";

export class CategoriaService {
  public listar(): Categoria[] {
    return Object.values(categorias);
  }

  public criar(categoria: Categoria): Categoria {
    const { path, nome } = categoria;

    validarCamposObrigatorios(nome, path);
    if (categorias[path]) {
      throw new ErroValidacao(ERRO_CATEGORIA_JA_EXISTE);
    }

    categorias[path] = categoria;
    return categorias[path];
  }

  public excluir(path: string): string {
    validarCamposObrigatorios(path);

    if (!categorias[path]) {
      throw new ErroRegistroInexistente(path);
    }

    const posts = new PostService().listarPorCategoria(path);
    if (posts.length) {
      throw new ErroValidacao(ERRO_CATEGORIA_POSSUI_POSTS);
    }

    delete categorias[path];

    return path;
  }
}
