import { Request } from "express";
import { scyllaClient } from "../config/db";
import { replyQueries } from "../queries/reply.queries";
import { generateUUID, getRating } from "../utils/helper";
import { logger } from "../utils/logger";
import { commentQueries } from "../queries/comment.queries";

export const fetchAllRepliesService = async (req: Request) => {
  const { comment_id } = req.params;
  const { cursor, limit = 4 } = req.query;
  const created_at =
    cursor ||
    new Date(
      new Date().setFullYear(new Date().getFullYear() - 1)
    ).toISOString();

  const result = await scyllaClient.execute(
    replyQueries.getByCommentId,
    [comment_id, created_at, +limit],
    { prepare: true }
  );

  logger.info("Replies fetched", { comment_id, count: result.rowLength });
  return {
    message: "Replies fetched",
    success: true,
    data: result.rows || [],
  };
};

export const fetchReplyByIdService = async (req: Request) => {
  const { reply_id } = req.params;
  const query = "SELECT * FROM replies WHERE reply_id = ?";

  const result = await scyllaClient.execute(query, [reply_id], {
    prepare: true,
  });

  const found = result.rowLength > 0;
  logger.info("Fetch reply by ID", { reply_id, found });

  return {
    message: found ? "Reply fetched" : "Reply not found",
    success: found,
    data: result.rows || [],
  };
};

export const createReplyService = async (req: Request) => {
  const { comment_id, video_id } = req.params;
  const { user_id, content, username } = req.body;
  const now = new Date();
  const reply_id = generateUUID();

  const created_at_string = req.query.created_at as string;
  const date = new Date(created_at_string);

  await scyllaClient.execute(
    replyQueries.insert,
    [reply_id, comment_id, user_id, content, now, now, false, 0, 0, username],
    {
      prepare: true,
    }
  );

  await updateCommentTable(
    comment_id,
    video_id,
    user_id,
    username,
    date,
    "add"
  );

  logger.info("Reply created and comment updated", {
    reply_id,
    comment_id,
    user_id,
  });

  return {
    message: "Reply created",
    success: true,
    data: { reply_id },
  };
};

export const updateReplyService = async (req: Request) => {
  const { reply_id, comment_id } = req.params;
  const { content, created_at } = req.body;

  await scyllaClient.execute(
    replyQueries.update,
    [content, comment_id, created_at, reply_id],
    {
      prepare: true,
    }
  );

  logger.info("Reply updated", { reply_id });
  return { message: "Reply updated", success: true, data: [] };
};

export const deleteReplyService = async (req: Request) => {
  const { reply_id, comment_id, video_id } = req.params;
  const { user_id, username } = req.body;
  const created_at_string = req.query.created_at as string;
  const date = new Date(created_at_string);

  const resultQueries = await Promise.all([
    scyllaClient.execute(replyQueries.deleteLikes, [reply_id], {
      prepare: true,
    }),
    scyllaClient.execute(replyQueries.delete, [reply_id, user_id], {
      prepare: true,
    }),
  ]);

  await updateCommentTable(
    comment_id,
    video_id,
    user_id,
    username,
    date,
    "remove"
  );

  logger.info("Reply and related data deleted", { reply_id, comment_id });
  return {
    message: "Reply and related data deleted",
    success: true,
    data: [],
  };
};

export const likeDislikeAReplyService = async (req: Request) => {
  const { reply_id, comment_id } = req.params;
  const { user_id, liked, likes_count, dislikes_count, created_at } = req.body;
  const created_at_string = created_at as string;
  const date = new Date(created_at_string);

  const exist = await scyllaClient.execute(
    replyQueries.likeExist,
    [reply_id, comment_id, user_id],
    {
      prepare: true,
    }
  );
  if (exist.rows.length > 0) {
    throw Object.assign(new Error("Action not allowed"), {
      status: 500,
      details: "Action not allowed",
    });
  }
  const result = await Promise.all([
    scyllaClient.execute(
      replyQueries.likeInsert,
      [reply_id, comment_id, user_id, liked],
      {
        prepare: true,
      }
    ),
    scyllaClient.execute(
      replyQueries.updateCounts,
      [likes_count, dislikes_count, comment_id, date, reply_id],
      {
        prepare: true,
      }
    ),
  ]);

  logger.info("Reply like/dislike added", { reply_id, user_id, liked });
  return {
    message: "Reply like/dislike added",
    success: true,
    data: [],
  };
};

export const removeLikeDislikeForReplyService = async (req: Request) => {
  const { reply_id, comment_id } = req.params;
  const { user_id, likes_count, dislikes_count, created_at } = req.body;
  const created_at_string = created_at as string;
  const date = new Date(created_at_string);

  const exist = await scyllaClient.execute(
    replyQueries.likeExist,
    [reply_id, comment_id, user_id],
    {
      prepare: true,
    }
  );
  if (exist.rows.length === 0) {
    throw Object.assign(new Error("Action not allowed"), {
      status: 500,
      details: "Action not allowed",
    });
  }

  const result = await Promise.all([
    scyllaClient.execute(
      replyQueries.deleteLikes,
      [reply_id, comment_id, user_id],
      {
        prepare: true,
      }
    ),
    scyllaClient.execute(
      replyQueries.updateCounts,
      [likes_count, dislikes_count, comment_id, date, reply_id],
      {
        prepare: true,
      }
    ),
  ]);

  logger.info("Like/dislike removed", { reply_id, user_id });
  return {
    message: "Like/dislike removed",
    success: true,
    data: [],
  };
};

async function updateCommentTable(
  comment_id: string,
  video_id: string,
  user_id: string,
  username: string,
  date: Date,
  type: string
) {
  const result = await scyllaClient.execute(
    commentQueries.getCommentsById,
    [video_id, comment_id, date],
    { prepare: true }
  );

  let {
    created_at,
    content,
    likes_count,
    dislikes_count,
    reply_count,
    rating_score,
    edited,
  } = result.rows[0];
  if (type == "add") reply_count += 1;
  else if (type == "remove") reply_count -= 1;

  const newRating = getRating(
    created_at,
    likes_count,
    dislikes_count,
    reply_count
  );

  const query = [
    scyllaClient.execute(
      commentQueries.updateReplyCountAndRating,
      [reply_count, newRating, video_id, created_at, comment_id],
      { prepare: true }
    ),
    scyllaClient.execute(
      commentQueries.deleteFromRatingScore,
      [video_id, rating_score, comment_id],
      { prepare: true }
    ),
  ];

  await Promise.all(query);

  await scyllaClient.execute(
    commentQueries.insertIntoRatingScore,
    [
      video_id,
      rating_score,
      comment_id,
      user_id,
      content,
      created_at,
      edited,
      likes_count,
      dislikes_count,
      reply_count,
      username,
    ],
    { prepare: true }
  );
  return {};
}
