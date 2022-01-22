-- AlterTable
ALTER TABLE "topics" ALTER COLUMN "show_on_feed" DROP NOT NULL,
ALTER COLUMN "show_on_feed" SET DEFAULT false,
ALTER COLUMN "isVisible" DROP NOT NULL;
