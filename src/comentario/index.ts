import ComentarioRepository from "./ComentarioRepository";
import ComentarioService from "./ComentarioService";

type ComentarioType = {
  id?: string;
  idPai: string;
  timestamp: number;
  corpo: string;
  autor: string;
  nota: number;
};

type ComentarioIndexado = {
  [key: string]: ComentarioType;
};

type ComentariosType = {
  [key: string]: ComentarioIndexado;
};

type ComentarioParams = Pick<ComentarioType, "autor" | "corpo">;

export {
  ComentarioType,
  ComentariosType,
  ComentarioParams,
  ComentarioService,
  ComentarioRepository,
};
