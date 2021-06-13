export { CategoriaRepository } from "./CategoriaRepository";
export { CategoriaService } from "./CategoriaService";

export type Categoria = {
  path: string;
  nome: string;
};

export type CategoriasType = {
  [key: string]: Categoria;
};
