import cors from "cors";
import express, { Response as ExResponse, Request as ExRequest } from "express";
import { PORT } from "./common/constants";
import { WELCOME_TO_MORIA } from "./common/messages";
import { errorHandler, logErrors } from "./middleware/error";
import { RegisterRoutes } from "../build/routes";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  "/api-docs",
  swaggerUi.serve,
  async (_req: ExRequest, res: ExResponse) => {
    return res.send(
      swaggerUi.generateHTML(await import("../docs/swagger.json"))
    );
  }
);

RegisterRoutes(app);

app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => console.log(WELCOME_TO_MORIA));
