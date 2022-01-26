-- CreateTable
CREATE TABLE "topic_comments" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "topic_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "is_anonymous" BOOLEAN DEFAULT false,
    "topic_comment_id" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "topic_comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "topic_comments" ADD CONSTRAINT "topic_comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "topic_comments" ADD CONSTRAINT "topic_comments_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
