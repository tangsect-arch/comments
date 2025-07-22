import { Request, Response } from "express";
import {
  fetchAllCommentsService,
  fetchCommentByIdService,
  createCommentService,
  updateCommentsService,
  deleteCommentService,
  removeLikeDislikeForCommentServices,
  likeDislikeACommentService,
} from "../service/comment.service";
import { successResponse } from "../middleware/responseBuilder";

export const fetchAllComments = async (req: Request, res: Response) => {
  try {
    const result = await fetchAllCommentsService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to fetch comments"), {
      status: 500,
      details: err,
    });
  }
};

export const fetchCommentById = async (req: Request, res: Response) => {
  try {
    const result = await fetchCommentByIdService(req);
    const status = result.data.length > 0 ? 200 : 204;
    return res
      .status(status)
      .json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to fetch comments"), {
      status: 500,
      details: err,
    });
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const result = await createCommentService(req);
    return res.status(201).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to create comments"), {
      status: 500,
      details: err,
    });
  }
};

export const updateComments = async (req: Request, res: Response) => {
  try {
    const result = await updateCommentsService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to update comments"), {
      status: 500,
      details: err,
    });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const result = await deleteCommentService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to delete comments"), {
      status: 500,
      details: err,
    });
  }
};

export const likeDislikeAComment = async (req: Request, res: Response) => {
  try {
    const result = await likeDislikeACommentService(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to like/dislike comment"), {
      status: 500,
      details: err,
    });
  }
};

export const removeLikeDislikeForComment = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await removeLikeDislikeForCommentServices(req);
    return res.status(200).json(successResponse(result.message, result.data));
  } catch (err) {
    throw Object.assign(new Error("Failed to remove like/dislike"), {
      status: 500,
      details: err,
    });
  }
};
