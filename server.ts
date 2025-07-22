import app from "./app";

import { env } from "./src/config/env";
import { logger } from "./src/utils/logger";
import { initScyllaSchema } from "./src/config/db";
const PORT: number = parseInt(env.PORT);

(async () => {
  try {
    await initScyllaSchema();
    console.log("ScyllaDB schema initialized successfully.");
    app.listen(PORT, () => {
      logger.info(`http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Server failed to start", error);
    process.exit(1);
  }
})();
