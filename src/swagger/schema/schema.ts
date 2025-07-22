export const apiSchemas = {
  User: {
    type: "object",
    properties: {
      user_id: { type: "string", format: "uuid" },
      name: { type: "string" },
      username: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
      provider: { type: "string", example: "local" },
      created_at: { type: "string", format: "date-time" },
    },
  },

  Video: {
    type: "object",
    properties: {
      username: { type: "string" },
      video_id: { type: "string", format: "uuid" },
      title: { type: "string" },
      description: { type: "string" },
      created_at: { type: "string", format: "date-time" },
    },
  },

  CommentByCreatedAt: {
    type: "object",
    properties: {
      username: { type: "string" },
      video_id: { type: "string" },
      rating_score: { type: "number", format: "float" },
      comment_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
      content: { type: "string" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
      edited: { type: "boolean" },
      likes_count: { type: "integer" },
      dislikes_count: { type: "integer" },
      reply_count: { type: "integer" },
    },
  },

  CommentByRating: {
    type: "object",
    properties: {
      username: { type: "string" },
      video_id: { type: "string" },
      rating_score: { type: "number", format: "float" },
      comment_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
      content: { type: "string" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
      edited: { type: "boolean" },
      likes_count: { type: "integer" },
      dislikes_count: { type: "integer" },
      reply_count: { type: "integer" },
    },
  },

  Reply: {
    type: "object",
    properties: {
      username: { type: "string" },
      reply_id: { type: "string", format: "uuid" },
      comment_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
      content: { type: "string" },
      created_at: { type: "string", format: "date-time" },
      updated_at: { type: "string", format: "date-time" },
      edited: { type: "boolean" },
      likes_count: { type: "integer" },
      dislikes_count: { type: "integer" },
    },
  },

  CommentLike: {
    type: "object",
    properties: {
      comment_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
      liked: { type: "boolean" },
    },
  },

  ReplyLike: {
    type: "object",
    properties: {
      reply_id: { type: "string", format: "uuid" },
      comment_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
      liked: { type: "boolean" },
    },
  },
};
