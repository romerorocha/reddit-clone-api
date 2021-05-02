export interface BasePost {
  titulo: string;
  corpo: string;
  autor: string;
  categoria: string;
}

export interface Post extends BasePost {
  id: string;
  timestamp: number;
  nota: number;
  numeroComentarios: number;
}

export interface Posts {
  [key: string]: Post;
}
