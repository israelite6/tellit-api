-- CreateTable
CREATE TABLE "user_message" (
    "id" SERIAL NOT NULL,
    "to_user_id" TEXT NOT NULL,
    "from_user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "user_message_pkey" PRIMARY KEY ("id")
);
