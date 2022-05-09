/*
  Warnings:

  - A unique constraint covering the columns `[device_token]` on the table `fcm` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "fcm_device_token_key" ON "fcm"("device_token");
