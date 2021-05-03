import cors from "cors";
import express from "express";
import { PORT } from "./common/constants";
import { WELCOME_TO_MORIA } from "./common/messages";
import { authHandler } from "./middleware/auth";
import { errorHandler, logErrors } from "./middleware/error";
import { RegisterRoutes } from "../build/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authHandler);

app.use(logErrors);
app.use(errorHandler);

RegisterRoutes(app);

app.listen(PORT, () => console.log(WELCOME_TO_MORIA));
