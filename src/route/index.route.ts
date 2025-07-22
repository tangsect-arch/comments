import express from "express";

import authRouter from "./auth.route";
import videoRoutes from "./videos.route";
import { logger } from "../utils/logger";

const indexRouter = express.Router();
indexRouter.use("/auth", authRouter);
indexRouter.use("/videos", videoRoutes);

export default indexRouter;
