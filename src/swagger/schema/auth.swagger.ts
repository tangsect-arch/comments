export const authSchemas = {
  User: {
    type: "object",
    required: ["name", "username", "email", "password"],
    properties: {
      name: { type: "string" },
      username: { type: "string" },
      email: { type: "string", format: "email" },
      password: { type: "string" },
      provider: { type: "string", example: "local" },
      google_id: { type: "string", example: "" },
    },
  },
  LoginInput: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string" },
    },
  },
  LoginResponse: {
    type: "object",
    properties: {
      message: { type: "string" },
      success: { type: "boolean" },
      data: {
        type: "object",
        properties: {
          user: { $ref: "#/components/schemas/User" },
          token: { type: "string" },
        },
      },
    },
  },
  RegisterInput: {
    type: "object",
    required: ["name", "username", "email", "password", "provider"],
    properties: {
      name: {
        type: "string",
        example: "John Doe",
      },
      username: {
        type: "string",
        example: "johndoe",
      },
      email: {
        type: "string",
        format: "email",
        example: "user@example.com",
      },
      password: {
        type: "string",
        format: "password",
        example: "securepassword123",
      },
      provider: {
        type: "string",
        enum: ["local", "google"],
        example: "local",
      },
      google_id: {
        type: "string",
        nullable: true,
        example: "",
      },
    },
  },

  RegisterResponse: {
    type: "object",
    properties: {
      message: {
        type: "string",
        example: "Registered successfully",
      },
      success: {
        type: "boolean",
        example: true,
      },
      data: {
        type: "array",
        properties: [],
      },
    },
  },
};
