import {
  PrismaClient,
  ELikeType,
  ELikeCategory,
  ECommentType,
} from '@prisma/client';
import answers from '../data/answer';
import likes from '../data/likes';
import questions from '../data/questions';

const prisma = new PrismaClient();

const getAnswerByQuestionId = (qId) => {
  return answers
    .filter(({ question_id }) => question_id === qId)
    .map(
      ({
        question_id: questionId,
        answer,
        id,
        created_at: createdAt,
        user_id: userId,
      }) => ({
        // questionId,
        answer,
        id,
        createdAt,
        userId,
        TopicComment: null,
        Like: null,
      }),
    );
};

const getAnswerCommentByAnswerId = (id) => {
  return answers
    .filter(({ answer_id }) => answer_id === id)
    .map(
      ({
        answer: comment,
        user_id: userId,
        created_at: createdAt,
        id: commentId,
      }) => ({
        comment,
        userId,
        createdAt,
        type: ECommentType.ANSWER,
        answerId: id,
        id: commentId,
        Like: null,
      }),
    );
};

const getAnswerLikeByAnswerId = (id) => {
  return likes
    .filter(({ answer_id: answerId }) => answerId === id)
    .map(({ answer_id: answerId, user_id: userId }) => ({
      // answerId,
      userId,
      type: ELikeType.LIKE,
      category: ELikeCategory.ANSWER,
    }));
};

const getAnswerCommentLikeByCommentId = (id) => {
  return likes
    .filter(({ answer_id }) => answer_id === id)
    .map(({ answer_id: answerId, user_id: userId }) => ({
      answerId,
      userId,
      type: ELikeType.LIKE,
      category: ELikeCategory.ANSWER_COMMENT,
    }));
};

export const seedQuestions = () => {
  questions.forEach(
    async ({ id, question, user_id: userId, created_at: createdAt }) => {
      const filteredAnswers = getAnswerByQuestionId(id);
      filteredAnswers.map((answer) => {
        const likeAnswer = getAnswerLikeByAnswerId(answer.id);
        const filteredComment = getAnswerCommentByAnswerId(id);

        filteredComment.map((comment) => {
          const filteredCommentLike = getAnswerCommentLikeByCommentId(
            comment.id,
          );
          comment.Like = { create: filteredCommentLike };
        });

        answer.TopicComment = { create: filteredComment };
        answer.Like = { create: likeAnswer };
        return answer;
      });

      await prisma.question.upsert({
        where: { id },
        update: {},
        create: {
          id,
          question,
          userId,
          createdAt,
          Answer: { create: filteredAnswers },
        },
      });
    },
  );
};
