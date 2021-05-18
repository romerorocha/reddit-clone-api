export { ComentarioRepository } from "./ComentarioRepository";
export { ComentarioService } from "./ComentarioService";

export type ComentarioType = {
  id?: string;
  idPai: string;
  timestamp: number;
  corpo: string;
  autor: string;
  nota: number;
};

export type ComentariosType = {
  [key: string]: {
    [key: string]: ComentarioType;
  };
};

export type ComentarioParams = Pick<ComentarioType, "autor" | "corpo">;
