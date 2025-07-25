import cassandra from "cassandra-driver";
import { env } from "./env";
import { logger } from "../utils/logger";

export const scyllaClient = new cassandra.Client({
  contactPoints: [env.SCYLLADB_HOST],
  localDataCenter: env.SCYLLADB_DATACENTER,
  credentials: {
    username: env.SCYLLADB_USERNAME,
    password: env.SCYLLADB_PASSWORD,
  },
  keyspace: undefined,
});

//DROP KEYSPACE ${env.SCYLLADB_KEYSPACE};

const schema = `
DROP KEYSPACE ${env.SCYLLADB_KEYSPACE};
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
  google_id TEXT,
  created_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS users_email_idx ON ${env.SCYLLADB_KEYSPACE}.users (email);
CREATE INDEX IF NOT EXISTS users_username_idx ON ${env.SCYLLADB_KEYSPACE}.users (username);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.videos (
  video_id UUID PRIMARY KEY,
  user_id UUID,
  title TEXT,
  description TEXT,
  created_at TIMESTAMP,
  username TEXT
);

CREATE TABLE IF NOT EXISTS ${env.SCYLLADB_KEYSPACE}.comments_by_created_at (
  username TEXT,
  video_id UUID,
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
  username TEXT,
  video_id UUID,
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
  username TEXT,
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
  PRIMARY KEY (reply_id, comment_id, user_id)
);


`;

export const initScyllaSchema = async () => {
  const statements = schema
    .split(";")
    .map((stmt) => stmt.trim())
    .filter((stmt) => stmt.length > 0);

  for (const stmt of statements) {
    try {
      await scyllaClient.execute(stmt);
      logger.info("Executed:", stmt.split("\n")[0]);
    } catch (err) {
      console.error("Failed to execute:", stmt, "\n", err);
    }
  }

  scyllaClient.keyspace = env.SCYLLADB_KEYSPACE;
};
