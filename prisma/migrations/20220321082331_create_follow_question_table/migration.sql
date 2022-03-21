-- CreateTable
CREATE TABLE "follow_question" (
    "id" SERIAL NOT NULL,
    "questionId" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "follow_question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "follow_question" ADD CONSTRAINT "follow_question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow_question" ADD CONSTRAINT "follow_question_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
