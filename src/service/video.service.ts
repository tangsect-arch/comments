import { Request } from "express";
import { scyllaClient } from "../config/db";
import { videoQueries } from "../queries/video.queries";
import { generateUUID } from "../utils/helper";
import { logger } from "../utils/logger";

export const getAllVideosService = async (req: Request) => {
  const { cursor, limit = 10 } = req.query;
  const created_at =
    cursor || new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString();
  const result = await scyllaClient.execute(
    videoQueries.getByVideoAll,
    [created_at, +limit],
    { prepare: true }
  );

  logger.info("Fetched all videos", { count: result.rowLength });

  return {
    message: "Videos fetched",
    success: true,
    data: result.rows || [],
  };
};

export const uploadVideoService = async (req: Request) => {
  const { user_id, title, description, username } = req.body;
  const now = new Date();
  const video_id = generateUUID();

  await scyllaClient.execute(
    videoQueries.upload,
    [video_id, user_id, title, description, now, username],
    { prepare: true }
  );

  logger.info("Video uploaded", { video_id, user_id });

  return {
    message: "Video uploaded successfully",
    success: true,
    data: { video_id },
  };
};

export const getVideoByIdService = async (req: Request) => {
  const { video_id } = req.params;
  const result = await scyllaClient.execute(
    videoQueries.getVideoById,
    [video_id],
    { prepare: true }
  );

  const found = result.rowLength > 0;
  const resultData = found ? result.rows : [];
  logger.info("Fetch video by ID", { video_id, found });

  return {
    message: found ? "Video fetched" : "Video not found",
    success: true,
    data: resultData,
  };
};
