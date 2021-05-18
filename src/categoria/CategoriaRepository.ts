import { CategoriaType, CategoriasType } from ".";
import clone from "clone";

const init: CategoriasType = {
  react: { nome: "React", path: "react" },
  javascript: { nome: "JavaScript", path: "javascript" },
  "senhor-dos-aneis": {
    nome: "Senhor dos Anéis",
    path: "senhor-dos-aneis",
  },
};

let categorias = clone(init);

export const resetCategoriasDB = () => {
  categorias = clone(init);
};

export class CategoriaRepository {
  public obter(path: string): CategoriaType {
    return categorias[path];
  }

  public listar(): CategoriaType[] {
    return Object.values(categorias);
  }

  public salvar(categoria: CategoriaType): CategoriaType {
    const { path } = categoria;
    if (path) {
      categorias[path] = categoria;
    }
    return categorias[path];
  }

  public excluir(path: string): string {
    if (categorias[path]) {
      delete categorias[path];
      return path;
    }

    return "";
  }
}
