import { apiSchemas } from "../schema/schema";
import { ReplySchemas as replySchemas } from "./../schema/reply.swagger";

export const replyDocs = {
  "/videos/{video_id}/comment/{comment_id}/replies": {
    get: {
      summary: "Get replies for a comment",
      tags: ["Replies"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: {
          description: "Replies fetched successfully",
          content: {
            "application/json": {
              schema: replySchemas.FetchAllRepliesResponse,
            },
          },
        },
      },
    },
    post: {
      summary: "Create reply to a comment",
      tags: ["Replies"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: replySchemas.CreateReplyInput,
          },
        },
      },
      responses: {
        201: {
          description: "Reply created successfully",
          content: {
            "application/json": {
              schema: replySchemas.CreateReplyResponse,
            },
          },
        },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/replies/{reply_id}": {
    get: {
      summary: "Get reply by ID",
      tags: ["Replies"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "reply_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: {
          description: "Reply retrieved successfully",
          content: {
            "application/json": {
              schema: replySchemas.FetchReplyByIdResponse,
            },
          },
        },
      },
    },
    delete: {
      summary: "Delete reply",
      tags: ["Replies"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "reply_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        200: {
          description: "Reply deleted successfully",
          content: {
            "application/json": {
              schema: replySchemas.DeleteReplyResponse,
            },
          },
        },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/replies/{reply_id}/like-dislike": {
    patch: {
      summary: "Like or dislike a reply",
      tags: ["Replies"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
        {
          in: "path",
          name: "reply_id",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: replySchemas.LikeDislikeReplyInput,
          },
        },
      },
      responses: {
        200: {
          description: "Like/dislike updated successfully",
          content: {
            "application/json": {
              schema: replySchemas.LikeDislikeReplyResponse,
            },
          },
        },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/replies/{reply_id}/like-dislike/{reply_like_id}":
    {
      delete: {
        summary: "Remove like/dislike from reply",
        tags: ["Replies"],
        parameters: [
          {
            in: "path",
            name: "video_id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
          {
            in: "path",
            name: "comment_id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
          {
            in: "path",
            name: "reply_id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
          {
            in: "path",
            name: "reply_like_id",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          200: {
            description: "Like/dislike removed successfully",
            content: {
              "application/json": {
                schema: replySchemas.RemoveLikeDislikeReplyResponse,
              },
            },
          },
        },
      },
    },
};
