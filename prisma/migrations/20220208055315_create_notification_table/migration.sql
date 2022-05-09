/*
  Warnings:

  - You are about to drop the column `end_at` on the `education_histories` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `education_histories` table. All the data in the column will be lost.
  - You are about to drop the column `end_at` on the `work_experiences` table. All the data in the column will be lost.
  - You are about to drop the column `start_at` on the `work_experiences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "education_histories" DROP COLUMN "end_at",
DROP COLUMN "start_at",
ADD COLUMN     "end_month" TEXT DEFAULT E'00',
ADD COLUMN     "end_year" TEXT DEFAULT E'0000',
ADD COLUMN     "start_month" TEXT NOT NULL DEFAULT E'00',
ADD COLUMN     "start_year" TEXT NOT NULL DEFAULT E'0000';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "photo_url" TEXT;

-- AlterTable
ALTER TABLE "work_experiences" DROP COLUMN "end_at",
DROP COLUMN "start_at",
ADD COLUMN     "end_month" TEXT DEFAULT E'00',
ADD COLUMN     "end_year" TEXT DEFAULT E'0000',
ADD COLUMN     "start_month" TEXT NOT NULL DEFAULT E'00',
ADD COLUMN     "start_year" TEXT NOT NULL DEFAULT E'0000';

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "url" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
