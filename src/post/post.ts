export interface IPost {
  id?: string;
  titulo: string;
  corpo: string;
  autor: string;
  categoria: string;
  timestamp: number;
  nota: number;
  numeroComentarios: number;
}

export interface IPosts {
  [key: string]: IPost;
}
