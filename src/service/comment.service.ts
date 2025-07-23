import { Request } from "express";
import { scyllaClient } from "../config/db";
import { commentQueries } from "../queries/comment.queries";
import { generateUUID, getRating } from "../utils/helper";
import { logger } from "../utils/logger";

export const fetchAllCommentsService = async (req: Request) => {
  const { video_id } = req.params;
  const { cursor, limit = 4, sort } = req.query;
  const fetchSize = +limit || 4;
  const pageState = cursor || null;

  let rows: any[] = [];
  let nextPageState: string | undefined;

  const options = {
    prepare: true,
    fetchSize,
    pageState,
  };

  let result;
  let params;
  let query;
  params = [video_id];
  if (sort === "rated") {
    query = commentQueries.getByRating;
  } else {
    query = commentQueries.getComments;
  }

  result = await scyllaClient.execute(query, params, options);
  console.log(result);

  logger.info("Comments fetched", { video_id, count: result.rowLength });
  return {
    message: "Comments fetched",
    success: true,
    data: {
      comments: result.rows || [],
      nextPageState: result.pageState,
    },
  };
};

export const fetchCommentByIdService = async (req: Request) => {
  const { video_id, comment_id } = req.params;
  const created_at_string = req.query.created_at as string;
  const date = new Date(created_at_string);
  const result = await scyllaClient.execute(
    commentQueries.getCommentsById,
    [video_id, comment_id],
    { prepare: true }
  );

  const found = result.rowLength > 0;
  logger.info("Fetch comment by ID", { video_id, comment_id, found });

  return {
    message: found ? "Comment fetched" : "Comment not found",
    success: found,
    data: result.rows || [],
  };
};

export const createCommentService = async (req: Request) => {
  const { video_id } = req.params;
  let { user_id, username, content, rating_score = 0 } = req.body;

  const now = new Date();
  rating_score = getRating(now, 0, 0, 0);
  const comment_id = generateUUID();
  const queries = [
    scyllaClient.execute(
      commentQueries.insertIntoCreatedAt,
      [
        video_id,
        rating_score,
        comment_id,
        user_id,
        content,
        now,
        false,
        username,
      ],
      { prepare: true }
    ),
    scyllaClient.execute(
      commentQueries.insertIntoRatingScore,
      [
        video_id,
        rating_score,
        comment_id,
        user_id,
        content,
        now,
        false,
        0,
        0,
        0,
        username,
      ],
      { prepare: true }
    ),
  ];

  await Promise.all(queries);

  logger.info("Comment created", { comment_id, video_id, user_id });
  return {
    message: "Comment created",
    success: true,
    data: { comment_id },
  };
};

export const updateCommentsService = async (req: Request) => {
  const { video_id, comment_id } = req.params;
  const {
    created_at,
    content,
    likes_count,
    dislikes_count,
    reply_count,
    rating_score,
    user_id,
    username,
  } = req.body;

  const existCheck = await scyllaClient.execute(
    commentQueries.getCommentsByUserId,
    [video_id, comment_id, created_at, user_id],
    { prepare: true }
  );
  if (existCheck.rows[0].length === 0) {
    throw Object.assign(new Error("Action not allowed"), {
      status: 403,
      details: "Action not allowed",
    });
  }
  const commentQuery = [
    scyllaClient.execute(
      commentQueries.updateCreatedAt,
      [
        content,
        rating_score,
        likes_count,
        dislikes_count,
        reply_count,
        video_id,
        created_at,
        comment_id,
      ],
      { prepare: true }
    ),
    scyllaClient.execute(
      commentQueries.updateRating,
      [
        content,
        rating_score,
        likes_count,
        dislikes_count,
        reply_count,
        video_id,
        created_at,
        comment_id,
      ],
      { prepare: true }
    ),
  ];

  await Promise.all(commentQuery);
  logger.info("Comment updated", { comment_id });
  return {
    message: "Comment updated",
    success: true,
    data: [],
  };
};

export const deleteCommentService = async (req: Request) => {
  const { video_id, comment_id } = req.params;
  const { rating_score } = req.query;

  const { user_id } = req.body;
  const created_at_string = req.query.created_at as string;
  const created_at = new Date(created_at_string);

  const existCheck = await scyllaClient.execute(
    commentQueries.getCommentsByUserId,
    [video_id, created_at, comment_id, user_id],
    { prepare: true }
  );

  if (existCheck.rows[0].length === 0) {
    throw Object.assign(new Error("Action not allowed"), {
      status: 403,
      details: "Action not allowed",
    });
  }

  const deleteTasks = [
    scyllaClient.execute(commentQueries.deleteLikesReply, [comment_id], {
      prepare: true,
    }),
    scyllaClient.execute(commentQueries.deleteReplies, [comment_id], {
      prepare: true,
    }),
    scyllaClient.execute(commentQueries.deleteLikesComment, [comment_id], {
      prepare: true,
    }),
    scyllaClient.execute(
      commentQueries.deleteFromCreatedAt,
      [video_id, created_at, comment_id],
      { prepare: true }
    ),
    scyllaClient.execute(
      commentQueries.deleteFromRatingScore,
      [video_id, rating_score, comment_id],
      { prepare: true }
    ),
  ];

  await Promise.all(deleteTasks);

  logger.info("Comment and related data deleted", { comment_id });
  return {
    message: "Comment and related data deleted",
    success: true,
    data: [],
  };
};

export const likeDislikeACommentService = async (req: Request) => {
  const {
    created_at,
    content,
    likes_count,
    dislikes_count,
    reply_count,
    rating_score,
    user_id,
    liked,
    edited,
    username,
  } = req.body;

  const { video_id, comment_id } = req.params;
  const created_at_string = created_at as string;
  const date = new Date(created_at_string);

  const newRating = getRating(
    created_at,
    likes_count,
    dislikes_count,
    reply_count
  );

  const resultQueries = await scyllaClient.execute(
    commentQueries.getCommentLike,
    [comment_id, user_id],
    {
      prepare: true,
    }
  );
  if (resultQueries.rows.length > 0) {
    throw Object.assign(new Error("Action not allowed"), {
      status: 500,
      details: "Action not allowed",
    });
  }

  const likeQueries = [
    scyllaClient.execute(
      commentQueries.likeInsert,
      [comment_id, user_id, liked],
      {
        prepare: true,
      }
    ),
    scyllaClient.execute(
      commentQueries.updateCreatedAt,
      [
        content,
        newRating,
        likes_count,
        dislikes_count,
        reply_count,
        video_id,
        created_at,
        comment_id,
      ],
      {
        prepare: true,
      }
    ),
    scyllaClient.execute(
      commentQueries.deleteFromRatingScore,
      [video_id, rating_score, comment_id],
      {
        prepare: true,
      }
    ),
  ];

  await Promise.all(likeQueries);

  await scyllaClient.execute(
    commentQueries.insertIntoRatingScore,
    [
      video_id,
      newRating,
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
    {
      prepare: true,
    }
  );

  logger.info("Comment like/dislike added", { comment_id, user_id });
  return {
    message: "Comment like/dislike added",
    success: true,
    data: [],
  };
};

export const removeLikeDislikeForCommentServices = async (req: Request) => {
  const {
    video_id,
    created_at,
    comment_id,
    content,
    likes_count,
    dislikes_count,
    reply_count,
    rating_score,
    user_id,
    edited,
    username,
  } = req.body;
  const created_at_string = created_at as string;
  const date = new Date(created_at_string);

  const newRating = getRating(
    created_at,
    likes_count,
    dislikes_count,
    reply_count
  );

  const resultQueries = await scyllaClient.execute(
    commentQueries.getCommentLike,
    [comment_id, user_id],
    {
      prepare: true,
    }
  );
  if (resultQueries.rows.length === 0) {
    throw Object.assign(new Error("Action not allowed"), {
      status: 500,
      details: "Action not allowed",
    });
  }

  const likeQueries = [
    scyllaClient.execute(commentQueries.likeDelete, [comment_id, user_id], {
      prepare: true,
    }),
    scyllaClient.execute(
      commentQueries.updateCreatedAt,
      [
        content,
        newRating,
        likes_count,
        dislikes_count,
        reply_count,
        video_id,
        created_at,
        comment_id,
      ],
      {
        prepare: true,
      }
    ),
    scyllaClient.execute(
      commentQueries.deleteFromRatingScore,
      [video_id, rating_score, comment_id],
      {
        prepare: true,
      }
    ),
  ];

  await Promise.all(likeQueries);

  await scyllaClient.execute(
    commentQueries.insertIntoRatingScore,
    [
      video_id,
      newRating,
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
    {
      prepare: true,
    }
  );

  logger.info("Comment like/dislike removed", { comment_id, user_id });
  return {
    message: "Comment like/dislike removed",
    success: true,
    data: [],
  };
};
