import { Request, Response } from "express";

import { loginService, registerService } from "../service/auth.service";
import { successResponse } from "../middleware/responseBuilder";

export const login = async (req: Request, res: Response) => {
  try {
    const { message, data } = await loginService(req);

    res.cookie("token", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(successResponse(message, data));
  } catch (err) {
    throw Object.assign(new Error("Login failed"), {
      status: 401,
      details: err,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const result = await registerService(req);

    return res.status(201).json(result);
  } catch (err) {
    throw Object.assign(new Error("Registration failed"), {
      status: 409,
      details: "User with this email or username already exists",
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json(successResponse("Logged out successfully"));
  } catch (err) {
    throw Object.assign(new Error("Logout failed"), {
      status: 500,
      details: "Logout failed",
    });
  }
};
