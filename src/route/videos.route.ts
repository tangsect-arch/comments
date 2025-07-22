import express, { Request, Response } from "express";
import {
  getAllVideos,
  getVideoById,
  uploadVideo,
} from "../controller/video.controller";
import {
  createComment,
  deleteComment,
  fetchAllComments,
  fetchCommentById,
  likeDislikeAComment,
  removeLikeDislikeForComment,
  updateComments,
} from "../controller/comment.controller";
import {
  createReply,
  deleteReply,
  fetchAllReplies,
  fetchReplyById,
  likeDislikeAReply,
  removeLikeDislikeForReply,
  updateReply,
} from "../controller/reply.controller";
import { authMiddleware } from "../middleware/auth";
import { logger } from "../utils/logger";

const router = express.Router();
router
  .get("/", getAllVideos)
  .post("/", authMiddleware, uploadVideo)
  .get("/:video_id", getVideoById)

  .get("/:video_id/comments", fetchAllComments)
  .post("/:video_id/comments", authMiddleware, createComment)
  .get("/:video_id/comments/:comment_id", fetchCommentById)
  .put("/:video_id/comments/:comment_id", authMiddleware, updateComments)
  .delete("/:video_id/comments/:comment_id", authMiddleware, deleteComment)

  .get("/:video_id/comments/:comment_id/replies", fetchAllReplies)
  .post("/:video_id/comments/:comment_id/replies", authMiddleware, createReply)
  .get("/:video_id/comments/:comment_id/replies/:reply_id", fetchReplyById)
  .put("/:video_id/comments/:comment_id/replies/:reply_id", updateReply)
  .delete(
    "/:video_id/comments/:comment_id/replies/:reply_id",
    authMiddleware,
    deleteReply
  )

  .put(
    "/:video_id/comments/:comment_id/like-dislike",
    authMiddleware,
    likeDislikeAComment
  )
  .patch(
    "/:video_id/comments/:comment_id/like-dislike",
    authMiddleware,
    removeLikeDislikeForComment
  )
  .patch(
    "/:video_id/comments/:comment_id/replies/:reply_id/like-dislike",
    authMiddleware,
    likeDislikeAReply
  )
  .delete(
    "/:video_id/comments/:comment_id/replies/:reply_id/like-dislike/:reply_like_id",
    authMiddleware,
    removeLikeDislikeForReply
  );

export default router;
