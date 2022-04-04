-- CreateEnum
CREATE TYPE "ECommentType" AS ENUM ('TOPIC', 'ANSWER');

-- AlterTable
ALTER TABLE "topic_comments" ADD COLUMN     "answer_id" INTEGER,
ADD COLUMN     "type" "ECommentType" NOT NULL DEFAULT E'TOPIC',
ALTER COLUMN "topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "topic_comments" ADD CONSTRAINT "topic_comments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
