import { env } from "../config/env";

export const replyQueries = {
  getByCommentId: `SELECT * FROM ${env.SCYLLADB_KEYSPACE}.replies WHERE comment_id = ? AND created_at > ?  LIMIT ?`,
  getByReplyId: `SELECT * FROM ${env.SCYLLADB_KEYSPACE}.replies WHERE comment_id = ? AND reply_id = ? AND created_at > ?  LIMIT ?`,
  insert: `INSERT INTO ${env.SCYLLADB_KEYSPACE}.replies (reply_id, comment_id, user_id, content, created_at, updated_at, edited, likes_count, dislikes_count, username)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

  update: `UPDATE ${env.SCYLLADB_KEYSPACE}.replies SET content = ?, edited = true, updated_at = toTimestamp(now()) WHERE comment_id = ? AND created_at = ? AND reply_id = ?`,
  updateCounts: `UPDATE ${env.SCYLLADB_KEYSPACE}.replies SET likes_count = ?, dislikes_count = ? updated_at = toTimestamp(now()) WHERE comment_id = ? AND created_at = ? AND reply_id = ?`,

  delete: `DELETE FROM ${env.SCYLLADB_KEYSPACE}.replies WHERE reply_id = ?`,
  deleteLikes: `DELETE ${env.SCYLLADB_KEYSPACE}. reply_likes WHERE reply_id = ? AND comment_id = ? AND user_id = ?`,

  likeInsert: `INSERT INTO ${env.SCYLLADB_KEYSPACE}.reply_likes (reply_id, comment_id, user_id, liked) VALUES (?, ?, ?, ?)`,
  likeExist: `SELECT * FROM ${env.SCYLLADB_KEYSPACE}.reply_likes WHERE reply_id = ? AND comment_id = ? AND user_id = ?`,
};
