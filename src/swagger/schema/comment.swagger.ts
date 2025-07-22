import { apiSchemas } from "./schema";
const commentSchema = apiSchemas.CommentByCreatedAt;
export const commentSchemas = {
  Comment: {
    type: "object",
    required: [
      "video_id",
      "rating_score",
      "comment_id",
      "user_id",
      "content",
      "created_at",
      "updated_at",
      "edited",
      "likes_count",
      "dislikes_count",
      "reply_count",
    ],
    properties: {
      video_id: { type: "string", example: "abc123video" },
      rating_score: { type: "number", example: 4.7 },
      comment_id: { type: "string", format: "uuid", example: "c123-456-uuid" },
      user_id: { type: "string", format: "uuid", example: "u789-123-uuid" },
      content: { type: "string", example: "Awesome explanation!" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
      edited: { type: "boolean", example: false },
      likes_count: { type: "integer", example: 10 },
      dislikes_count: { type: "integer", example: 2 },
      reply_count: { type: "integer", example: 5 },
    },
  },

  FetchAllCommentsInput: {
    type: "object",
    properties: {
      video_id: { type: "string", example: "abc123video" },
      limit: { type: "integer", example: 10 },
      before: {
        type: "string",
        format: "date-time",
        example: "2025-07-20T14:00:00Z",
      },
    },
  },

  FetchAllCommentsResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Fetched all comments" },
      success: { type: "boolean", example: true },
      data: { type: "array", items: commentSchema },
    },
  },

  FetchCommentByIdInput: {
    type: "object",
    properties: {
      video_id: { type: "string", example: "abc123video" },
      comment_id: { type: "string", format: "uuid", example: "c123-456-uuid" },
    },
  },

  FetchCommentByIdResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Fetched comment" },
      success: { type: "boolean", example: true },
      data: { type: "array", items: commentSchema },
    },
  },

  CreateCommentsInput: {
    type: "object",
    required: ["user_id", "content"],
    properties: {
      user_id: { type: "string", format: "uuid" },
      content: { type: "string", example: "New comment goes here" },
    },
  },

  CreateCommentsResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Comment created" },
      success: { type: "boolean", example: true },
      data: { type: "array", items: [] },
    },
  },

  UpdateCommentsInput: {
    type: "object",
    required: [
      "video_id",
      "comment_id",
      "created_at",
      "content",
      "likes_count",
      "dislikes_count",
      "reply_count",
      "edited",
      "rating_score",
    ],
    properties: {
      video_id: {
        type: "string",
        format: "uuid",
        example: "f1236e7b-9d6d-4878-b5f9-25692ecbdd4c",
      },
      comment_id: {
        type: "string",
        format: "uuid",
        example: "7e3050a2-58f7-482a-8020-5c2f44c8c024",
      },
      created_at: {
        type: "string",
        format: "date-time",
        example: "2025-07-22T12:58:27.683Z",
      },
      content: {
        type: "string",
        example: "New comment goes here 00108",
      },
      likes_count: {
        type: "integer",
        example: 0,
      },
      dislikes_count: {
        type: "integer",
        example: 0,
      },
      reply_count: {
        type: "integer",
        example: 0,
      },
      edited: {
        type: "boolean",
        example: false,
      },
      rating_score: {
        type: "number",
        example: 1,
      },
    },
  },

  UpdateCommentsResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Comment updated successfully" },
      success: { type: "boolean", example: true },
      data: { type: "array", items: [] },
    },
  },

  LikeDislikeCommentsInput: {
    type: "object",
    required: ["liked"],
    properties: {
      liked: {
        type: "boolean",
        example: true,
        description: "`true` = like, `false` = dislike",
      },
    },
  },

  LikeDislikeCommentsResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Comment liked/disliked" },
      success: { type: "boolean", example: true },
      data: { type: "array", items: [] },
    },
  },

  RemoveLikeUnlikeCommentsInput: {
    type: "object",
    required: ["comment_id", "user_id"],
    properties: {
      comment_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
    },
  },

  RemoveLikeUnlikeResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Like/dislike removed" },
      success: { type: "boolean", example: true },
      data: { type: "array", items: [] },
    },
  },
};
