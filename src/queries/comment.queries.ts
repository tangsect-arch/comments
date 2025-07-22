import { env } from "../config/env";

export const commentQueries = {
  getByRating: `
    SELECT * FROM ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score
    WHERE video_id = ?
    LIMIT ?`,

  getComments: `
    SELECT * FROM ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    WHERE video_id = ? AND created_at < ?
    LIMIT ?`,

  getCommentsByUserId: `
    SELECT * FROM ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    WHERE video_id = ? AND comment_id = ? AND created_at = ? AND user_id = ? ALLOW FILTERING;`,

  getCommentsById: `
    SELECT * FROM ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    WHERE video_id = ? AND comment_id = ? AND created_at = ? ALLOW FILTERING;`,

  insertIntoCreatedAt: `
    INSERT INTO ${env.SCYLLADB_KEYSPACE}.comments_by_created_at (
      video_id, rating_score, comment_id, user_id, content,
      created_at, updated_at, edited, likes_count, dislikes_count, reply_count, username
    ) VALUES (?, ?, ?, ?, ?, ?, toTimestamp(now()), ?, 0, 0, 0,?)`,

  insertIntoRatingScore: `
    INSERT INTO ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score (
      video_id, rating_score, comment_id, user_id, content,
      created_at, updated_at, edited, likes_count, dislikes_count, reply_count, username
    ) VALUES (?, ?, ?, ?, ?, ?, toTimestamp(now()), ?, ?, ?, ?, ?)`,

  updateCreatedAt: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    SET content = ?, edited = true, updated_at = toTimestamp(now()), rating_score = ?,
    likes_count = ?, dislikes_count = ?, reply_count = ?
    WHERE video_id = ? AND created_at = ? AND comment_id = ? `,

  deleteFromCreatedAt: `
    DELETE FROM ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    WHERE video_id = ? AND created_at = ? AND comment_id = ?`,

  deleteFromRatingScore: `
    DELETE FROM ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score
    WHERE video_id = ? AND rating_score = ? AND comment_id = ?`,

  deleteReplies: `
    DELETE FROM ${env.SCYLLADB_KEYSPACE}.replies
    WHERE comment_id = ?`,

  deleteLikesComment: `
    DELETE FROM ${env.SCYLLADB_KEYSPACE}.comment_likes
    WHERE comment_id = ?`,

  deleteLikesReply: `
    DELETE FROM ${env.SCYLLADB_KEYSPACE}.reply_likes
    WHERE comment_id = ?`,

  likeInsert: `
    INSERT INTO ${env.SCYLLADB_KEYSPACE}.comment_likes (comment_id, user_id, liked)
    VALUES (?, ?, ?)`,

  likeDelete: `
    DELETE FROM ${env.SCYLLADB_KEYSPACE}.comment_likes
    WHERE comment_id = ? AND user_id = ?`,

  getCommentLike: `
    SELECT * FROM  ${env.SCYLLADB_KEYSPACE}.comment_likes
    WHERE comment_id = ? AND user_id = ?`,

  incLikeCreatedAt: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    SET likes_count = likes_count + 1, rating_score = ?
    WHERE video_id = ? AND created_at = ? AND comment_id = ?`,

  incLikeRatingScore: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score
    SET likes_count = likes_count + 1, rating_score = ?
    WHERE video_id = ? AND rating_score = ? AND comment_id = ?`,

  incDislikeCreatedAt: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    SET dislikes_count = dislikes_count + 1, rating_score = ?
    WHERE video_id = ? AND created_at = ? AND comment_id = ?`,

  incDislikeRatingScore: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score
    SET dislikes_count = dislikes_count + 1, rating_score = ?
    WHERE video_id = ? AND rating_score = ? AND comment_id = ?`,

  decLikeCreatedAt: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    SET likes_count = likes_count - 1, rating_score = ?
    WHERE video_id = ? AND created_at = ? AND comment_id = ?`,

  decLikeRatingScore: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score
    SET likes_count = likes_count - 1, rating_score = ?
    WHERE video_id = ? AND rating_score = ? AND comment_id = ?`,

  decDislikeCreatedAt: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at
    SET dislikes_count = dislikes_count - 1, rating_score = ?
    WHERE video_id = ? AND created_at = ? AND comment_id = ?`,

  decDislikeRatingScore: `
    UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score
    SET dislikes_count = dislikes_count - 1, rating_score = ?
    WHERE video_id = ? AND rating_score = ? AND comment_id = ?`,

  commentByIdandUserId: `
  SELECT liked FROM ${env.SCYLLADB_KEYSPACE}.comment_likes 
  WHERE comment_id = ? AND user_id = ?`,

  updateReplyCountAndRating: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at 
  SET reply_count = ?, rating_score = ? WHERE video_id = ?
  AND created_at = ? AND comment_id = ?;`,

  insertCommentCounters: `insert into ${env.SCYLLADB_KEYSPACE}.comment_counters 
  (video_id, comment_id, likes_count, dislikes_count, reply_count) values (?, ?, 0, 0, 0);`,

  incrimentCommentCounterLike: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET likes_count = likes_count + 1 WHERE video_id = ?
  AND comment_id = ?;
  `,

  incrimentCommentCounterDislike: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET dislikes_count = dislikes_count + 1 WHERE video_id = ?
  AND comment_id = ?;
  `,

  incrimentCommentCounterReply: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET reply_count = reply_count + 1 WHERE video_id = ?
  AND comment_id = ?;
  `,

  decrimentCommentCounterLike: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET likes_count = likes_count - 1 WHERE video_id = ?
  AND comment_id = ?;
  `,

  decrimentCommentCounterDislike: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET dislikes_count = dislikes_count - 1 WHERE video_id = ?
  AND comment_id = ?;
  `,

  decrimentCommentCounterReply: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET reply_count = reply_count - 1 WHERE video_id = ?
  AND comment_id = ?;
  `,

  deleteCommentCounter: `
  DELETE from ${env.SCYLLADB_KEYSPACE}.comment_counters 
  SET reply_count = ?, rating_score = ? WHERE video_id = ?
  AND created_at = ? AND comment_id = ?;
  `,

  updateCommentRating: `
  UPDATE ${env.SCYLLADB_KEYSPACE}.comments_by_created_at 
  SET rating_score = ? WHERE video_id = ?
  AND comment_id = ? AND created_at = ?;
  `,

  commentCounterData: `
  SELECT * FROM ${env.SCYLLADB_KEYSPACE}.comment_counters
  WHERE video_id = ? AND comment_id = ?
  `,
};
