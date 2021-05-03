import { Response, Request, NextFunction } from "express";
import { ErroAutorizacao } from "../common/erros";

export const authHandler = (req: Request, _: Response, next: NextFunction) => {
  const token = req.get("Authorization");
  if (!token) {
    throw new ErroAutorizacao();
  }
  next();
};
