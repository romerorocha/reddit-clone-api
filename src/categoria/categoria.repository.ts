import { ICategoria, ICategorias } from "./categoria";

export const categorias: ICategorias = {
  react: { nome: "React", path: "react" },
  javascript: { nome: "JavaScript", path: "javascript" },
  "senhor-dos-aneis": {
    nome: "Senhor dos Anéis",
    path: "senhor-dos-aneis",
  },
};

export class CategoriaRepository {
  public obter(path: string): ICategoria {
    return categorias[path];
  }

  public listar(): ICategoria[] {
    return Object.values(categorias);
  }

  public salvar(categoria: ICategoria): ICategoria {
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
