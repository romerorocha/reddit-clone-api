export interface IComentario {
  id?: string;
  idPai: string;
  timestamp: number;
  corpo: string;
  autor: string;
  nota: number;
}

export interface IComentarioIndexado {
  [key: string]: IComentario;
}

export interface IComentarios {
  [key: string]: IComentarioIndexado;
}
