CREATE KEYSPACE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}
WITH replication = {
  'class': 'SimpleStrategy',
  'replication_factor': 1
};

USE ${env.SCYLLADB_KEYSPACE};

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.users (
  user_id UUID PRIMARY KEY,
  name TEXT,
  username TEXT,
  email TEXT,
  password TEXT,
  provider TEXT,
  created_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS users_email_idx ON ${env.SCYLLADB_KEYSPACE}.users (email);
CREATE INDEX IF NOT EXISTS users_username_idx ON ${env.SCYLLADB_KEYSPACE}.users (username);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.videos (
  video_id UUID PRIMARY KEY,
  user_id UUID,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.comments_by_created_at (
  video_id TEXT,
  rating_score DOUBLE,
  comment_id UUID,
  user_id UUID,
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  edited BOOLEAN,
  likes_count INT,
  dislikes_count INT,
  reply_count INT,
  PRIMARY KEY ((video_id), created_at, comment_id)
) WITH CLUSTERING ORDER BY (created_at DESC, comment_id ASC);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.comments_by_rating_score (
  video_id TEXT,
  rating_score DOUBLE,
  comment_id UUID,
  user_id UUID,
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  edited BOOLEAN,
  likes_count INT,
  dislikes_count INT,
  reply_count INT,
  PRIMARY KEY ((video_id), rating_score, comment_id)
) WITH CLUSTERING ORDER BY (rating_score DESC, comment_id ASC);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.replies (
  reply_id UUID,
  comment_id UUID,
  user_id UUID,
  content TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  edited BOOLEAN,
  likes_count INT,
  dislikes_count INT,
  PRIMARY KEY (comment_id, created_at, reply_id)
) WITH CLUSTERING ORDER BY (created_at DESC);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.comment_likes (
  comment_id UUID,
  user_id UUID,
  liked BOOLEAN,
  PRIMARY KEY (comment_id, user_id)
);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.reply_likes (
  reply_id UUID,
  comment_id UUID,
  user_id UUID,
  liked BOOLEAN,
  PRIMARY KEY (reply_id, user_id)
);