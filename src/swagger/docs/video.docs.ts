export const videoDocs = {
  "/videos": {
    get: {
      summary: "Get all videos",
      tags: ["Videos"],
      parameters: [
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
      ],
      responses: {
        200: {
          description: "List of videos",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Videos fetched" },
                  success: { type: "boolean", example: true },
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        video_id: { type: "string", format: "uuid" },
                        user_id: { type: "string", format: "uuid" },
                        username: { type: "string" },
                        title: { type: "string" },
                        description: { type: "string" },
                        created_at: { type: "string", format: "date-time" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },

    post: {
      summary: "Upload a new video",
      tags: ["Videos"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["user_id", "title", "description"],
              properties: {
                title: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Video uploaded successfully",
          content: {
            "application/json": {
              schema: {
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
                      username: { type: "string" },
                      description: { type: "string" },
                      created_at: { type: "string", format: "date-time" },
                    },
                  },
                },
              },
            },
          },
        },
        400: { description: "Invalid input" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/videos/{id}": {
    get: {
      summary: "Get a video by ID",
      tags: ["Videos"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: {
            type: "string",
            format: "uuid",
          },
          description: "ID of the video to retrieve",
        },
      ],
      responses: {
        200: {
          description: "Video details",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: { type: "string", example: "Video found" },
                  success: { type: "boolean", example: true },
                  data: {
                    type: "object",
                    properties: {
                      video_id: { type: "string", format: "uuid" },
                      user_id: { type: "string", format: "uuid" },
                      title: { type: "string" },
                      description: { type: "string" },
                      created_at: { type: "string", format: "date-time" },
                      username: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
        404: { description: "Video not found" },
        500: { description: "Internal server error" },
      },
    },
  },
};
