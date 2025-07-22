import { env } from "../config/env";

export const videoQueries = {
  upload: `INSERT INTO ${env.SCYLLADB_KEYSPACE}.videos (video_id, user_id, title, description, created_at, username) VALUES (?, ?, ?, ?, ?)`,
  getAllByUserId: `SELECT * FROM ${env.SCYLLADB_KEYSPACE}.videos WHERE user_id = ? ALLOW FILTERING`,
  getByVideoAll: `SELECT * FROM ${env.SCYLLADB_KEYSPACE}.videos WHERE created_at > ? LIMIT ? ALLOW FILTERING`,
  getVideoById: `SELECT * FROM ${env.SCYLLADB_KEYSPACE}.videos WHERE video_id = ?`,
};
