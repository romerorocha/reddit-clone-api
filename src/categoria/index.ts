import CategoriaRepository from "./CategoriaRepository";
import CategoriaService from "./CategoriaService";

type CategoriaType = {
  path: string;
  nome: string;
};

type CategoriasType = {
  [key: string]: CategoriaType;
};

export { CategoriaType, CategoriasType, CategoriaService, CategoriaRepository };
