-- DropForeignKey
ALTER TABLE "likes" DROP CONSTRAINT "likes_topic_id_fkey";

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "topicCommentId" TEXT,
ALTER COLUMN "topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_topicCommentId_fkey" FOREIGN KEY ("topicCommentId") REFERENCES "topic_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
