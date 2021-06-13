import { Request, Response, NextFunction } from "express";

export const delay = (_req: Request, _res: Response, next: NextFunction) => {
  const seconds = parseInt(process.env.SEGUNDOS_API_DELAY || "0") * 1000;
  return setTimeout(next, seconds);
};
