/*
  Warnings:

  - You are about to drop the `topic_likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ELikeCategory" AS ENUM ('TOPIC', 'TOPIC_COMMENT', 'ANSWER', 'ANSWER_COMMENT');

-- DropForeignKey
ALTER TABLE "topic_likes" DROP CONSTRAINT "topic_likes_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "topic_likes" DROP CONSTRAINT "topic_likes_user_id_fkey";

-- DropTable
DROP TABLE "topic_likes";

-- CreateTable
CREATE TABLE "likes" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" BIGINT NOT NULL,
    "type" "ELikeType" NOT NULL,
    "category" "ELikeCategory" NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "likes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likes" ADD CONSTRAINT "likes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
