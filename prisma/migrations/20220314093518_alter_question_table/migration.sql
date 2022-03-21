-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "space_id" INTEGER;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("id") ON DELETE SET NULL ON UPDATE CASCADE;
