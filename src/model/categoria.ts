export interface Categoria {
  path: string;
  nome: string;
}

export interface Categorias {
  [key: string]: Categoria;
}
