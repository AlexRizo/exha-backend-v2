/*
  Warnings:

  - You are about to drop the column `text` on the `Option` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Option" DROP COLUMN "text",
ADD COLUMN     "content" TEXT;
