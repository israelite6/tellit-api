/*
  Warnings:

  - Added the required column `type` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ENotificationType" AS ENUM ('TOPIC', 'MENTION', 'COMMENT');

-- AlterTable
ALTER TABLE "notifications" ADD COLUMN     "type" "ENotificationType" NOT NULL;
