import { SEGUNDOS_API_DELAY } from "common/constantes";
import { Request, Response, NextFunction } from "express";

export const delay = (_req: Request, _res: Response, next: NextFunction) => {
  const seconds = SEGUNDOS_API_DELAY * 1000;
  return setTimeout(next, seconds);
};
