import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const getEnv = (key: string, fallback = ""): string => {
  const value = process.env[key];
  if (!value) {
    console.warn(`Warning: Missing environment variable: ${key}`);
  }
  return value || fallback;
};

export const env = {
  PORT: getEnv("PORT", "5000"),
  SCYLLADB_HOST: getEnv("SCYLLADB_HOST"),
  SCYLLADB_HOST2: getEnv("SCYLLADB_HOST2"),
  SCYLLADB_HOST3: getEnv("SCYLLADB_HOST3"),
  SCYLLADB_DATACENTER: getEnv("SCYLLADB_DATACENTER"),
  SCYLLADB_KEYSPACE: getEnv("SCYLLADB_KEYSPACE"),
  SCYLLADB_USERNAME: getEnv("SCYLLADB_USERNAME"),
  SCYLLADB_PASSWORD: getEnv("SCYLLADB_PASSWORD"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  JWT_EXPIRATION: getEnv("JWT_EXPIRATION", "1h"),
  NODE_ENV: getEnv("NODE_ENV", "dev"),
  PASSWORD_SALT_ROUNDS: parseInt(getEnv("PASSWORD_SALT_ROUNDS", "10"), 10),
};

export const test_env = {
  ...env,
  DB_URL: "mongodb://localhost:27017/jest-test",
};

import { CorsOptions } from "cors";
export const corsConfig: CorsOptions = {
  origin: getEnv("CORS_ORIGIN", "*"),
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

import { Options as RateLimitOptions } from "express-rate-limit";
export const rateLimits: Partial<RateLimitOptions> = {
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
  statusCode: 429,
  legacyHeaders: false,
  standardHeaders: true,
};
