/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `EmployeeProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_id_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_id_fkey";

-- AlterTable
ALTER TABLE "EmployeeProfile" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_user_id_key" ON "EmployeeProfile"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_user_id_key" ON "StudentProfile"("user_id");

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
