import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

import { env } from "../config/env";
import { TokenPayload } from "../entities/entities";

export const encodeToken = (user: TokenPayload): string => {
  if (!user || typeof user !== "object") {
    throw new Error("Invalid user payload for token.");
  }

  const payload = {
    user_id: user.user_id,
    email: user.email,
    username: user.username,
    name: user.name,
  };

  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION,
  });
};

export const decodeToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = Number(env.PASSWORD_SALT_ROUNDS);
  if (isNaN(saltRounds)) {
    throw new Error("Invalid PASSWORD_SALT_ROUNDS in environment");
  }
  return bcrypt.hash(password, saltRounds);
};

export const isPasswordValid = async (
  plainText: string,
  hashed: string,
): Promise<boolean> => {
  return await bcrypt.compare(plainText, hashed);
};

export const isPasswordMatch = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, userPassword);
  return isMatch;
};

export const generateUUID = (): string => {
  return uuidv4();
};

export const getRating = (
  created_at: Date,
  likes: number,
  dislikes: number,
  replies: number,
): number => {
  const now = new Date();
  created_at = new Date(created_at);
  const ageInHours = (now.getTime() - created_at.getTime()) / (1000 * 60 * 60);

  const likeScore = likes * 1.5;
  const dislikePenalty = dislikes * 1.0;
  const replyBonus = replies * 1.2;

  const timeDecay = 1 / Math.log2(ageInHours + 2);

  const rawScore = (likeScore + replyBonus - dislikePenalty) * timeDecay;

  const clampedScore = Math.max(1.0, Math.min(rawScore, 100.0));

  return parseFloat(clampedScore.toFixed(2));
};
