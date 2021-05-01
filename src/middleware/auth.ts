import { ErroAutorizacao } from "../validation/erros";

export const authHandler = (req, res, next) => {
  const token = req.get("Authorization");
  if (!token) {
    throw new ErroAutorizacao();
  }
  next();
};
