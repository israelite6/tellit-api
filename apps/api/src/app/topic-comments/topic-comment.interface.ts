export interface ICreateTopicCommentProps {
  userId: string;
  isAnonymous?: boolean;
  comment: string;
  topicCommentId?: string;
  topicId: number;
}

export interface IFindManyTopicCommentProps {
  topicId: number;
  page: number;
  topicCommentId?: string;
  userId?: string;
}
