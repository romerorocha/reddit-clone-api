import cors from "cors";
import "dotenv/config";
import express, { Request as ExRequest, Response as ExResponse } from "express";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "../build/routes";
import { WELCOME_TO_MORIA } from "./common/messages";
import { errorHandler, logErrors } from "./middleware/error";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../build/api-docs/swagger.json"))
    );
  }
);

RegisterRoutes(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log(WELCOME_TO_MORIA));
