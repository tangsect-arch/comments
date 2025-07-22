import { Request } from "express";
import {
  hashPassword,
  encodeToken,
  isPasswordMatch,
  generateUUID,
} from "../utils/helper";
import { User } from "../entities/entities";
import { scyllaClient } from "../config/db";
import { authQueries } from "../queries/auth.queries";
import { logger } from "../utils/logger";

export const loginService = async (req: Request) => {
  const { email, password } = req.body;

  logger.info("Login attempt", { email });

  const result = await scyllaClient.execute(
    authQueries.getUserByEmail,
    [email],
    { prepare: true }
  );

  if (result.rowLength === 0) {
    throw Object.assign(new Error("User not found"), {
      status: 401,
      details: { email },
    });
  }

  const user = result.rows[0];
  const isMatch = await isPasswordMatch(password, user.password);
  if (!isMatch) {
    logger.warn("Login failed: Invalid password", { email });
    throw Object.assign(new Error("Invalid password"), {
      status: 401,
      details: { email },
    });
  }

  const payload = {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
    name: user.name,
  };
  const token = encodeToken(payload);
  const data = { payload, token };

  logger.info("Login successful", {
    user_id: user.user_id,
    email: user.email,
  });
  return { message: "Login successful", success: true, data };
};

export const registerService = async (req: Request) => {
  const {
    name,
    email,
    username,
    password,
    google_id = "",
    provider = "local",
  } = req.body;

  logger.info("Register attempt", { email, username });
  logger.info("query ", authQueries.insertUser);

  const check = await scyllaClient.execute(
    authQueries.getUserByEmail,
    [email],
    { prepare: true }
  );

  if (check.rowLength > 0) {
    throw Object.assign(new Error("User already exists"), {
      status: 409,
      details: { email, username },
    });
  }

  const hashedPassword = await hashPassword(password);

  const newUser: User = {
    user_id: generateUUID(),
    name,
    username,
    email,
    password: hashedPassword,
    provider,
    google_id,
    created_at: new Date(),
  };
  logger.info(newUser);
  logger.info(authQueries.insertUser);
  await scyllaClient.execute(
    authQueries.insertUser,
    [
      newUser.user_id,
      newUser.name,
      newUser.username,
      newUser.email,
      newUser.password,
      newUser.provider,
      newUser.google_id,
    ],
    { prepare: true }
  );

  logger.info("User registered successfully", {
    user_id: newUser.user_id,
    email,
    username,
  });

  return {
    message: "Registration successful",
    success: true,
    status: 201,
    data: [],
  };
};
