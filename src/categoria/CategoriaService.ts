import { CategoriaRepository, Categoria } from ".";

import { PostService } from "post";

import { ErroRegistroInexistente, ErroValidacao } from "common/erros";
import { validarCamposObrigatorios } from "common/validadores";
import {
  ERRO_CATEGORIA_JA_EXISTE,
  ERRO_CATEGORIA_POSSUI_POSTS,
} from "common/mensagens";

export class CategoriaService {
  readonly repository = new CategoriaRepository();
  readonly postService = new PostService();

  public listar(): Categoria[] {
    return this.repository.listar();
  }

  public criar(categoria: Categoria): Categoria {
    const { path, nome } = categoria;
    validarCamposObrigatorios({ nome, path });

    const categoriaExistente = this.repository.obter(path);
    if (categoriaExistente) {
      throw new ErroValidacao(ERRO_CATEGORIA_JA_EXISTE);
    }

    return this.repository.salvar(categoria);
  }

  public excluir(path: string): string {
    validarCamposObrigatorios(path);

    const categoriaExistente = this.repository.obter(path);
    if (!categoriaExistente) {
      throw new ErroRegistroInexistente(path);
    }

    const posts = this.postService.listarPorCategoria(path);
    if (posts.length) {
      throw new ErroValidacao(ERRO_CATEGORIA_POSSUI_POSTS);
    }

    return this.repository.excluir(path);
  }
}
