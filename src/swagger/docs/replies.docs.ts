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
          schema: { type: "string" },
        },
        {
          in: "path",
          name: "comment_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Replies fetched" },
      },
    },
    post: {
      summary: "Create reply to comment",
      tags: ["Replies"],
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
            schema: { $ref: "#/components/schemas/CreateReplyInput" },
          },
        },
      },
      responses: {
        201: { description: "Reply created" },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/replies/{reply_id}": {
    put: {
      summary: "Get reply by ID",
      tags: ["Replies"],
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
          name: "reply_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Reply retrieved" },
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
          name: "reply_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      responses: {
        200: { description: "Reply deleted" },
      },
    },
  },

  "/videos/{video_id}/comment/{comment_id}/replies/{reply_id}/like-dislike": {
    patch: {
      summary: "Like/dislike a reply",
      tags: ["Replies"],
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
          name: "reply_id",
          required: true,
          schema: { type: "string" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LikeDislikeReplyInput" },
          },
        },
      },
      responses: {
        200: { description: "Like/dislike updated" },
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
            name: "reply_id",
            required: true,
            schema: { type: "string" },
          },
          {
            in: "path",
            name: "reply_like_id",
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
