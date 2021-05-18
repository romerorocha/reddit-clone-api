export { CategoriaRepository } from "./CategoriaRepository";
export { CategoriaService } from "./CategoriaService";

export type CategoriaType = {
  path: string;
  nome: string;
};

export type CategoriasType = {
  [key: string]: CategoriaType;
};
