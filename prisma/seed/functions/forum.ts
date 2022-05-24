import { PrismaClient, ELikeCategory, ELikeType } from '@prisma/client';
import forums from '../data/forum';
import topics from '../data/topic';
import comments from '../data/comments';
import likes from '../data/likes';

const prisma = new PrismaClient();

const getTopicByForumId = (fId) => {
  return topics
    .filter(({ forum_id }) => forum_id === fId)
    .map(
      ({
        forum_id: forumId,
        title,
        description,
        user_id: userId,
        created_at: createdAt,
        id,
      }) => ({
        title,
        description,
        userId,
        createdAt,
        id,
        Comment: null,
        Like: null,
      }),
    );
};

const getCommentsByTopicId = (cId) => {
  return comments
    .filter(({ topic_id }) => topic_id === cId)
    .map(
      ({
        // topic_id: topicId,
        user_id: userId,
        comment,
        topic_comment_id: topicCommentId,
        id,
        created_at: createdAt,
      }) => ({ topicCommentId, comment, id, userId, createdAt, Like: null }),
    );
};

const mapLikeType = (type) => {
  if (type === 'upvote') {
    return ELikeType.UPVOTE;
  } else if (type === 'gbosa') {
    return ELikeType.THREE_GBOSA;
  } else if (type === 'insightful') {
    return ELikeType.INSIGHTFUL;
  } else {
    return ELikeType.LIKE;
  }
};

const getLikeByTopicId = (tId) => {
  return likes
    .filter(({ topic_id }) => topic_id === tId)
    .map(
      ({
        topic_id: topicId,
        created_at: createdAt,
        type,
        user_id: userId,
      }) => ({
        // topicId,
        userId,
        createdAt,
        type: mapLikeType(type),
        category: ELikeCategory.TOPIC,
      }),
    );
};

const getLikeByCommentId = (cId) => {
  return likes
    .filter(({ topic_comment_id }) => topic_comment_id === cId)
    .map(
      ({
        // topic_comment_id: topicCommentId,
        created_at: createdAt,
        type,
        user_id: userId,
      }) => ({
        // topicCommentId,
        createdAt,
        type: mapLikeType(type),
        category: ELikeCategory.TOPIC_COMMENT,
        userId,
      }),
    );
};

export const seedForums = () => {
  forums.forEach(async ({ id, title, description }) => {
    const formattedTopics = getTopicByForumId(id);

    formattedTopics.map((topic) => {
      const formattedComment = getCommentsByTopicId(topic.id);
      const topicLikes = getLikeByTopicId(topic.id);
      topic.Comment = {
        create: formattedComment,
      };
      topic.Like = {
        create: topicLikes,
      };

      formattedComment.map((comment) => {
        const commentLikes = getLikeByCommentId(comment.id);
        comment.Like = {
          create: commentLikes,
        };
        return comment;
      });
    });

    // console.log(
    //   util.inspect(formattedTopics, {
    //     showHidden: false,
    //     depth: null,
    //     colors: true,
    //   }),
    // );

    await prisma.forum.upsert({
      where: { id },
      update: {},
      create: {
        id,
        title,
        description,
        Topic: {
          create: formattedTopics,
        },
      },
    });
  });
};
