import swaggerJSDoc from "swagger-jsdoc";
import { env } from "../config/env";
import { apiSchemas } from "../swagger/schema/schema";
import { authDocs } from "../swagger/docs/auth.docs";
import { videoDocs } from "../swagger/docs/video.docs";
import { commentDocs } from "../swagger/docs/comment.docs";
import { replyDocs } from "../swagger/docs/replies.docs";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "YouTube Clone API",
      version: "1.0.0",
      description: "API documentation for auth, videos, comments, replies",
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: "Local dev server",
      },
    ],
    paths: {
      ...authDocs,
      ...videoDocs,
      ...commentDocs,
      ...replyDocs,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...apiSchemas,
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/route/*.ts"],
};

export default swaggerJSDoc(options);
