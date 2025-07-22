import { authSchemas } from "../schema/auth.swagger";
export const authDocs = {
  "/auth/login": {
    post: {
      summary: "Login a user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: authSchemas.LoginInput,
          },
        },
      },
      responses: {
        200: {
          description: "Successful login",
          content: {
            "application/json": {
              schema: authSchemas.LoginResponse,
            },
          },
        },
        401: { description: "Invalid email or password" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/auth/register": {
    post: {
      summary: "Register a new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: authSchemas.RegisterInput,
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: authSchemas.RegisterResponse,
            },
          },
        },
        409: { description: "Email or username already exists" },
        500: { description: "Internal server error" },
      },
    },
  },

  "/auth/logout": {
    post: {
      summary: "Logout the user",
      tags: ["Auth"],
      responses: {
        200: {
          description: "Successful logout",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "Logged out successfully",
                  },
                  success: { type: "boolean", example: true },
                },
              },
            },
          },
        },
        500: { description: "Internal server error" },
      },
    },
  },
};
