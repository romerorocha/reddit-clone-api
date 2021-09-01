import * as express from "express";
import { ErroAutorizacao } from "common/erros";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  _: string[]
): Promise<any> {
  if (securityName === "bearerAuth") {
    const token = request.headers.authorization?.replace("Bearer ", "") ?? "";
    const key = process.env.AUTH_KEY ?? "";
    if (token === key) {
      return Promise.resolve({
        id: 1,
        name: "Ring Bearer",
      });
    }
  }

  return Promise.reject(new ErroAutorizacao());
}
