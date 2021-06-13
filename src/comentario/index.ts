export { ComentarioRepository } from "./ComentarioRepository";
export { ComentarioService } from "./ComentarioService";

export type Comentario = {
  id?: string;
  idPai: string;
  timestamp: number;
  corpo: string;
  autor: string;
  nota: number;
};

export type ComentariosType = {
  [key: string]: {
    [key: string]: Comentario;
  };
};

export type ComentarioParams = Pick<Comentario, "autor" | "corpo">;
