export interface Comentario {
  id?: string;
  idPai: string;
  timestamp: number;
  corpo: string;
  autor: string;
  nota: number;
}

export interface ComentarioIndexado {
  [key: string]: Comentario;
}

export interface Comentarios {
  [key: string]: ComentarioIndexado;
}
