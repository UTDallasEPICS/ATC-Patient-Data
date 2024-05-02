/*
  Warnings:

  - You are about to drop the column `Role` on the `EmployeeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `EmployeeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `birthday` on the `User` table. All the data in the column will be lost.
  - Added the required column `birthday` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_userId_fkey";

-- DropIndex
DROP INDEX "EmployeeProfile_userId_key";

-- DropIndex
DROP INDEX "StudentProfile_userId_key";

-- AlterTable
ALTER TABLE "EmployeeProfile" DROP COLUMN "Role",
DROP COLUMN "userId",
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'Technician';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "userId",
ADD COLUMN     "birthday" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthday",
ALTER COLUMN "email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
