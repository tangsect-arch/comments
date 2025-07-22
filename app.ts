import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import { env } from "./src/config/env";
import { logger, morganConfig } from "./src/utils/logger";
import indexRouter from "./src/route/index.route";
import { errorHandler } from "./src/middleware/errorHandler";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan(morganConfig.format, { stream: morganConfig.stream }));

app.use("/api/v1", indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
