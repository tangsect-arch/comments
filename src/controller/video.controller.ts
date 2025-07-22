import { Request, Response } from "express";
import {
  getAllVideosService,
  getVideoByIdService,
  uploadVideoService,
} from "../service/video.service";
import { successResponse } from "../middleware/responseBuilder";

export const getAllVideos = async (req: Request, res: Response) => {
  try {
    const result = await getAllVideosService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Error fetching data"), {
      status: 500,
      details: err,
    });
  }
};

export const uploadVideo = async (req: Request, res: Response) => {
  try {
    const result = await uploadVideoService(req);
    return res.status(201).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Video creation failed"), {
      status: 500,
      details: err,
    });
  }
};

export const getVideoById = async (req: Request, res: Response) => {
  try {
    const result = await getVideoByIdService(req);
    const status = result.data.length > 0 ? 200 : 204;
    return res
      .status(status)
      .json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to fetch video"), {
      status: 500,
      details: err,
    });
  }
};
