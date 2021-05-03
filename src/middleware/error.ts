import { NextFunction, Request, Response } from "express";
import { HttpError } from "../common/erros";

export const logErrors = (
  err: HttpError,
  _: Request,
  __: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  next(err);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (err.status) {
    res.status(err.status).send(err);
  } else {
    res.status(500).send({ status: 500, mensagem: "Internal Server Error" });
  }
};
