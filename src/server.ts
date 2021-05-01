import cors from "cors";
import express from "express";
import swaggerUI from "swagger-ui-express";
import { PORT } from "./config/constants";
import { WELCOME_TO_MORIA } from "./config/messages";
import openApiDocs from "./docs";
import { authHandler } from "./middleware/auth";
import { errorHandler, logErrors } from "./middleware/error";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(openApiDocs));

app.use(authHandler);

app.use("/categorias", routes.categoria);
app.use("/posts", routes.post);
app.use("/comentarios", routes.comentario);

app.use(logErrors);
app.use(errorHandler);

app.listen(PORT, () => console.log(WELCOME_TO_MORIA));
