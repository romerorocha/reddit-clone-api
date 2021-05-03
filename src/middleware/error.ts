import { NextFunction, Request, Response } from "express";
import { HttpError } from "../common/erros";

export const logErrors = (
  err: HttpError,
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  next(err);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err.status && err.status !== 500) {
    const { name, message } = err;
    res.status(err.status).send({ name, message });
  } else {
    res.status(500).send({ status: 500, mensagem: "Internal Server Error" });
  }
};
