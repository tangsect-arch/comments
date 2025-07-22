import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../entities/entities";
import { logger } from "../utils/logger";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as User;
    const { user_id, username } = decoded;
    req.body.user = decoded;
    req.body.user_id = user_id;
    req.body.username = username;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden" });
  }
};
