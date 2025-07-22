import { Request, Response } from "express";
import {
  fetchAllRepliesService,
  fetchReplyByIdService,
  createReplyService,
  updateReplyService,
  deleteReplyService,
  likeDislikeAReplyService,
  removeLikeDislikeForReplyService,
} from "../service/reply.service";
import { successResponse } from "../middleware/responseBuilder";

export const fetchAllReplies = async (req: Request, res: Response) => {
  try {
    const result = await fetchAllRepliesService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to fetch reply"), {
      status: 500,
      details: err,
    });
  }
};

export const fetchReplyById = async (req: Request, res: Response) => {
  try {
    const result = await fetchReplyByIdService(req);
    const status = result.data.length>0 ? 200 : 204;
    return res
      .status(status)
      .json(
         successResponse(result.message, result.data)
      );
  } catch (err) {
    throw Object.assign(new Error("Failed to fetch reply"), {
      status: 500,
      details: err,
    });
  }
};

export const createReply = async (req: Request, res: Response) => {
  try {
    const result = await createReplyService(req);
    return res.status(201).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to create reply"), {
      status: 500,
      details: err,
    });
  }
};

export const updateReply = async (req: Request, res: Response) => {
  try {
    const result = await updateReplyService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to update reply"), {
      status: 500,
      details: err,
    });
    
  }
};

export const deleteReply = async (req: Request, res: Response) => {
  try {
    const result = await deleteReplyService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to delete reply"), {
      status: 500,
      details: err,
    });
    
  }
};

export const likeDislikeAReply = async (req: Request, res: Response) => {
  try {
    const result = await likeDislikeAReplyService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to like/dislike reply"), {
      status: 500,
      details: err,
    });
  };
}

export const removeLikeDislikeForReply = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await removeLikeDislikeForReplyService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("FFailed to remove like/dislike"), {
      status: 500,
      details: err,
    });
  }
};
