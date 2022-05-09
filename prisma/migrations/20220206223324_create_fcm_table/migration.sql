-- CreateEnum
CREATE TYPE "EOs" AS ENUM ('WEB', 'ANDROID', 'IOS');

-- CreateTable
CREATE TABLE "fcm" (
    "id" TEXT NOT NULL,
    "device_token" TEXT NOT NULL,
    "os" "EOs" NOT NULL,
    "user_id" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "fcm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "fcm" ADD CONSTRAINT "fcm_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
