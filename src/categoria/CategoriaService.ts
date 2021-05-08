import { CategoriaRepository, CategoriaType } from ".";
import { ErroRegistroInexistente, ErroValidacao } from "../common/erros";
import {
  ERRO_CATEGORIA_JA_EXISTE,
  ERRO_CATEGORIA_POSSUI_POSTS,
} from "../common/mensagens";
import { validarCamposObrigatorios } from "../common/validadores";
import { PostService } from "../post";

export default class CategoriaService {
  public listar(): CategoriaType[] {
    return new CategoriaRepository().listar();
  }

  public criar(categoria: CategoriaType): CategoriaType {
    const { path, nome } = categoria;
    validarCamposObrigatorios(nome, path);

    const repository = new CategoriaRepository();

    const categoriaExistente = repository.obter(path);
    if (categoriaExistente) {
      throw new ErroValidacao(ERRO_CATEGORIA_JA_EXISTE);
    }

    return repository.salvar(categoria);
  }

  public excluir(path: string): string {
    validarCamposObrigatorios(path);

    const repository = new CategoriaRepository();

    const categoriaExistente = repository.obter(path);
    if (!categoriaExistente) {
      throw new ErroRegistroInexistente(path);
    }

    //TODO desacoplar postservice
    const posts = new PostService().listarPorCategoria(path);
    if (posts.length) {
      throw new ErroValidacao(ERRO_CATEGORIA_POSSUI_POSTS);
    }

    return repository.excluir(path);
  }
}
