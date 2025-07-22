export const videoSchemas = {
  Video: {
    type: "object",
    properties: {
      video_id: { type: "string", format: "uuid" },
      user_id: { type: "string", format: "uuid" },
      title: { type: "string" },
      description: { type: "string" },
      created_at: { type: "string", format: "date-time" },
    },
  },
  CreateVideoInput: {
    type: "object",
    required: ["user_id", "title", "description"],
    properties: {
      user_id: { type: "string", format: "uuid" },
      title: { type: "string" },
      description: { type: "string" },
    },
  },
  CreateVideoResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Video uploaded" },
      success: { type: "boolean", example: true },
      data: {
        type: "object",
        properties: {
          video_id: { type: "string", format: "uuid" },
          user_id: { type: "string", format: "uuid" },
          title: { type: "string" },
          description: { type: "string" },
          created_at: { type: "string", format: "date-time" },
        },
      },
    },
  },
  GetAllVideosResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Videos fetched" },
      success: { type: "boolean", example: true },
      data: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Video",
        },
      },
    },
  },
  GetVideoByIdResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Video found" },
      success: { type: "boolean", example: true },
      data: {
        $ref: "#/components/schemas/Video",
      },
    },
  },
};
