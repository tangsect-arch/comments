export interface User {
  user_id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  provider: "google" | "local";
  google_id: string;
  created_at: Date;
}

export interface Video {
  video_id: string;
  title: string;
  description: string;
  created_at: Date;
}

export interface Comment {
  comment_id: string;
  video_id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  edited: boolean;
  likes_count: number;
  dislikes_count: number;
  reply_count: number;
  rating_score: number;
}

export interface Reply {
  reply_id: string;
  comment_id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  edited: boolean;
  likes_count: number;
  dislikes_count: number;
}

export interface CommentLike {
  comment_id: string;
  user_id: string;
  liked: boolean;
}

export interface ReplyLike {
  reply_id: string;
  user_id: string;
  comment_id: string;
  liked: boolean;
}

export interface SuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: any;
}

export interface TokenPayload {
  user_id: string;
  email: string;
  username: string;
  name: string;
}
