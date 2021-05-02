export interface BaseComentario {
  idPai: string;
  corpo: string;
  autor: string;
}

export interface Comentario extends BaseComentario {
  id: string;
  timestamp: number;
  nota: number;
}

export interface Comentarios {
  [key: string]: Comentario;
}
