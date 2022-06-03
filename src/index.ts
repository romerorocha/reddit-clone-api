import cors from "cors";
import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";

import { RegisterRoutes } from "../api-docs/routes";

import { WELCOME_TO_MORIA } from "common/mensagens";
import { PORT } from "common/constantes";

import { docsHandler } from "middleware/docs";
import { errorHandler, logErrors } from "middleware/error";
import { delay } from "middleware/delay";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, docsHandler);
app.use(delay);

RegisterRoutes(app);

app.use(logErrors);
app.use(errorHandler);
app.listen(PORT, () => console.log(WELCOME_TO_MORIA));
