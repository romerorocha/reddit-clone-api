import { CategoriaRepository, CategoriaType } from ".";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import {
  ERRO_CATEGORIA_JA_EXISTE,
  ERRO_CATEGORIA_POSSUI_POSTS,
} from "../common/mensagens";
import { validarCamposObrigatorios } from "../common/validadores";
import { PostService } from "../post";

export default class CategoriaService {
  readonly repository = new CategoriaRepository();
  readonly postService = new PostService();

  public listar(): CategoriaType[] {
    return this.repository.listar();
  }

  public criar(categoria: CategoriaType): CategoriaType {
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

    //TODO desacoplar postservice
    const posts = this.postService.listarPorCategoria(path);
    if (posts.length) {
      throw new ErroValidacao(ERRO_CATEGORIA_POSSUI_POSTS);
    }

    return this.repository.excluir(path);
  }
}
