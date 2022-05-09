/*
  Warnings:

  - The primary key for the `answers` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterEnum
ALTER TYPE "ELikeType" ADD VALUE 'UPVOTE';

-- DropForeignKey
ALTER TABLE "topic_comments" DROP CONSTRAINT "topic_comments_answer_id_fkey";

-- AlterTable
ALTER TABLE "answers" DROP CONSTRAINT "answers_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "answers_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "answers_id_seq";

-- AlterTable
ALTER TABLE "education_histories" ALTER COLUMN "degree" DROP NOT NULL,
ALTER COLUMN "course" DROP NOT NULL;

-- AlterTable
ALTER TABLE "likes" ADD COLUMN     "answer_id" TEXT;

-- AlterTable
ALTER TABLE "topic_comments" ALTER COLUMN "answer_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_email_confirmed" BOOLEAN DEFAULT false,
ADD COLUMN     "referral_id" TEXT;

-- CreateTable
CREATE TABLE "messages" (
    "id" SERIAL NOT NULL,
    "subject" TEXT,
    "message" TEXT NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "from_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topic_comments" ADD CONSTRAINT "topic_comments_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_from_user_id_fkey" FOREIGN KEY ("from_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
