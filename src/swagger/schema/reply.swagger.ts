export const ReplySchemas = {
  Reply: {
    type: "object",
    required: [
      "reply_id",
      "comment_id",
      "user_id",
      "content",
      "created_at",
      "updated_at",
      "edited",
      "likes_count",
      "dislikes_count",
    ],
    properties: {
      reply_id: { type: "string", format: "uuid", example: "r356-789-uuid" },
      comment_id: { type: "string", format: "uuid", example: "c123-456-uuid" },
      user_id: { type: "string", format: "uuid", example: "u789-123-uuid" },
      content: { type: "string", example: "Thanks for the explanation!" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
      edited: { type: "boolean", example: false },
      likes_count: { type: "integer", example: 4 },
      dislikes_count: { type: "integer", example: 1 },
    },
  },

  FetchAllRepliesInput: {
    type: "object",
    properties: {
      comment_id: { type: "string", format: "uuid", example: "c123-456-uuid" },
      limit: { type: "integer", example: 10 },
      before: {
        type: "string",
        format: "date-time",
        example: "2025-07-20T14:00:00Z",
      },
    },
  },

  FetchAllRepliesResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Fetched all replies" },
      success: { type: "boolean", example: true },
      data: {
        type: "array",
        items: { $ref: "#/components/schemas/Reply" },
      },
    },
  },

  FetchReplyByIdInput: {
    type: "object",
    properties: {
      reply_id: { type: "string", format: "uuid", example: "r356-789-uuid" },
    },
  },

  FetchReplyByIdResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Fetched reply" },
      success: { type: "boolean", example: true },
      data: { $ref: "#/components/schemas/Reply" },
    },
  },

  CreateRepliesInput: {
    type: "object",
    required: ["user_id", "content"],
    properties: {
      user_id: { type: "string", format: "uuid" },
      content: { type: "string", example: "This is a reply to the comment." },
    },
  },

  CreateRepliesResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Reply created" },
      success: { type: "boolean", example: true },
      data: { $ref: "#/components/schemas/Reply" },
    },
  },

  UpdateRepliesInput: {
    type: "object",
    required: ["content"],
    properties: {
      content: { type: "string", example: "Edited reply content." },
    },
  },

  UpdateRepliesResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Reply updated successfully" },
      success: { type: "boolean", example: true },
      data: { $ref: "#/components/schemas/Reply" },
    },
  },

  LikeDislikeRepliesInput: {
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

  LikeDislikeRepliesResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Reply liked/disliked" },
      success: { type: "boolean", example: true },
    },
  },

  RemoveLikeUnlikeRepliesInput: {
    type: "object",
    required: ["reply_id", "user_id"],
    properties: {
      reply_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
    },
  },

  RemoveLikeUnlikeResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Like/dislike removed" },
      success: { type: "boolean", example: true },
    },
  },
};
