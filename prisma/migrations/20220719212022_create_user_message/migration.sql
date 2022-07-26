/*
  Warnings:

  - You are about to drop the `user_message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user_message";

-- CreateTable
CREATE TABLE "userMessage" (
    "id" SERIAL NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "from_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "userMessage_pkey" PRIMARY KEY ("id")
);
