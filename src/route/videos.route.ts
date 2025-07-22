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
} from "../controller/reply.controller";

const router = express.Router();

router
  .get("/", getAllVideos)
  .post("/", uploadVideo)
  .get("/:video_id", getVideoById)

  .get("/:video_id/comments", fetchAllComments)
  .post("/:video_id/comments", createComment)
  .get("/:video_id/comments/:comment_id", fetchCommentById)
  .put("/:video_id/comments/:comment_id", updateComments)
  .delete("/:video_id/comments/:comment_id", deleteComment)

  .get("/:video_id/comments/:comment_id/replies", fetchAllReplies)
  .post("/:video_id/comments/:comment_id/replies", createReply)
  .put("/:video_id/comments/:comment_id/replies/:reply_id", fetchReplyById)
  .delete("/:video_id/comments/:comment_id/replies/:reply_id", deleteReply)

  .put("/:video_id/comments/:comment_id/like-dislike", likeDislikeAComment)
  .put(
    "/:video_id/comments/:comment_id/like-dislike/:comment_like_id",
    removeLikeDislikeForComment,
  )
  .patch(
    "/:video_id/comments/:comment_id/replies/:reply_id/like-dislike",
    likeDislikeAReply,
  )
  .delete(
    "/:video_id/comments/:comment_id/replies/:reply_id/like-dislike/:reply_like_id",
    removeLikeDislikeForReply,
  );

export default router;
