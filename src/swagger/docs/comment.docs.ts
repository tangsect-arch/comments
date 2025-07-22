import { commentSchemas } from "../schema/comment.swagger";

export const commentDocs = {
  "/videos/{video_id}/comments": {
    get: {
      summary: "Fetch comments for a video",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "query",
          name: "cursor",
          schema: {
            type: "string",
            format: "date-time",
          },
          description: "Cursor for pagination (created_at timestamp)",
        },
        {
          in: "query",
          name: "limit",
          schema: {
            type: "integer",
          },
          description: "Maximum number of videos to return",
        },
        {
          in: "query",
          name: "sort",
          schema: { type: "string", example: "rated" },
          description: "Sort by values. Either rated or empty",
        },
      ],
      responses: {
        200: {
          description: "Comments fetched",
          content: {
            "application/json": {
              schema: commentSchemas.FetchAllCommentsResponse,
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new comment",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: commentSchemas.CreateCommentsInput,
          },
        },
      },
      responses: {
        201: {
          description: "Comment created",
          content: {
            "application/json": {
              schema: commentSchemas.CreateCommentsResponse,
            },
          },
        },
      },
    },
  },

  "/videos/{video_id}/comments/{comment_id}": {
    get: {
      summary: "Fetch comment by ID",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "query",
          name: "created_at",
          required: true,
          schema: { type: "string" },
          description: "created at",
        },
      ],

      responses: {
        200: {
          description: "Comment retrieved",
          content: {
            "application/json": {
              schema: commentSchemas.FetchCommentByIdResponse,
            },
          },
        },
      },
    },
    put: {
      summary: "Update comment",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                content: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Comment updated",
          content: {
            "application/json": {
              schema: commentSchemas.UpdateCommentsResponse,
            },
          },
        },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/like-dislike": {
    patch: {
      summary: "Like or dislike a comment",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LikeDislikeCommentInput" },
          },
        },
      },
      responses: {
        200: { description: "Like/dislike updated" },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/like-dislike/{comment_like_id}": {
    delete: {
      summary: "Remove like/dislike on comment",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "comment_like_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Like/dislike removed" },
      },
    },
  },
};
