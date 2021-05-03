export interface Post {
  id: string;
  titulo: string;
  corpo: string;
  autor: string;
  categoria: string;
  timestamp: number;
  nota: number;
  numeroComentarios: number;
}

export interface Posts {
  [key: string]: Post;
}
