import swaggerUi from "swagger-ui-express";
import { Request as ExRequest, Response as ExResponse } from "express";

export const docsHandler = async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import("../../api-docs/swagger.json"))
  );
};
