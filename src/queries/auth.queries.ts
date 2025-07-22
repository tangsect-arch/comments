import { env } from "../config/env";

export const authQueries = {
  getUserByEmail: `SELECT user_id, username, name, password, email, provider, google_id FROM ${env.SCYLLADB_KEYSPACE}.users WHERE email = ? ALLOW FILTERING`,
  insertUser: `INSERT INTO ${env.SCYLLADB_KEYSPACE}.users (user_id, name, username, email, password, provider, google_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, toTimestamp(now()))`,
};
