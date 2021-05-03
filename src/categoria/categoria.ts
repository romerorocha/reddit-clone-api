export interface ICategoria {
  path: string;
  nome: string;
}

export interface ICategorias {
  [key: string]: ICategoria;
}
