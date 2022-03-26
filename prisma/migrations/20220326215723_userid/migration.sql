/*
  Warnings:

  - You are about to drop the column `user_Id` on the `ReadMe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `ReadMe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `ReadMe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ReadMe" DROP CONSTRAINT "ReadMe_user_Id_fkey";

-- DropIndex
DROP INDEX "ReadMe_user_Id_key";

-- AlterTable
ALTER TABLE "ReadMe" DROP COLUMN "user_Id",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ReadMe_user_id_key" ON "ReadMe"("user_id");

-- AddForeignKey
ALTER TABLE "ReadMe" ADD CONSTRAINT "ReadMe_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
