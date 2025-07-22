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
          description: "Maximum number of comments to return",
        },
        {
          in: "query",
          name: "sort",
          schema: { type: "string", example: "rated" },
          description:
            "Sort by values. Either 'rated' or leave empty for latest",
        },
      ],
      responses: {
        200: {
          description: "Comments fetched successfully",
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
          description: "Comment created successfully",
          content: {
            "application/json": {
              schema: commentSchemas.CreateCommentsResponse,
            },
          },
        },
        400: {
          description: "Invalid request body",
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
          schema: { type: "string", format: "date-time" },
          description: "The created_at timestamp of the comment",
        },
      ],
      responses: {
        200: {
          description: "Comment retrieved successfully",
          content: {
            "application/json": {
              schema: commentSchemas.FetchCommentByIdResponse,
            },
          },
        },
        404: {
          description: "Comment not found",
        },
      },
    },
    put: {
      summary: "Update a comment",
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
            schema: commentSchemas.UpdateCommentsInput,
          },
        },
      },
      responses: {
        200: {
          description: "Comment updated successfully",
          content: {
            "application/json": {
              schema: commentSchemas.UpdateCommentsResponse,
            },
          },
        },
        400: {
          description: "Invalid update input",
        },
        404: {
          description: "Comment not found",
        },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/like-dislike": {
    post: {
      summary: "Like or dislike a comment",
      tags: ["Comments"],
      parameters: [
        {
          in: "path",
          name: "video_id",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "f1236e7b-9d6d-4878-b5f9-25692ecbdd4c",
          },
          description: "The UUID of the video",
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
            example: "7e3050a2-58f7-482a-8020-5c2f44c8c024",
          },
          description: "The UUID of the comment to like/dislike",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: commentSchemas.LikeDislikeCommentsInput,
          },
        },
      },
      responses: {
        200: {
          description: "Like/dislike updated successfully",
          content: {
            "application/json": {
              schema: commentSchemas.LikeDislikeCommentsResponse,
            },
          },
        },
        400: {
          description: "Invalid input",
        },
        404: {
          description: "Comment not found",
        },
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
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: commentSchemas.RemoveLikeUnlikeCommentsInput,
          },
        },
      },
      responses: {
        200: {
          description: "Like/dislike removed successfully",
          content: {
            "application/json": {
              schema: commentSchemas.RemoveLikeUnlikeCommentsResponse,
            },
          },
        },
        404: {
          description: "Like/dislike not found",
        },
      },
    },
  },
};
