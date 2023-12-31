/*
  Warnings:

  - The values [BOOLEAN,COUNT,BOOLEAN_ARRAY,COUNT_ARRAY] on the enum `Datatype` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `role` on the `EmployeeProfile` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Program` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the `PatientProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `EmployeeProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `EmployeeProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Datatype_new" AS ENUM ('TRIAL', 'PROBE', 'DURATION', 'FREQUENCY');
ALTER TABLE "Behavior" ALTER COLUMN "datatype" DROP DEFAULT;
ALTER TABLE "Behavior" ALTER COLUMN "datatype" TYPE "Datatype_new" USING ("datatype"::text::"Datatype_new");
ALTER TYPE "Datatype" RENAME TO "Datatype_old";
ALTER TYPE "Datatype_new" RENAME TO "Datatype";
DROP TYPE "Datatype_old";
ALTER TABLE "Behavior" ALTER COLUMN "datatype" SET DEFAULT 'TRIAL';
COMMIT;

-- DropForeignKey
ALTER TABLE "EmployeeProfile" DROP CONSTRAINT "EmployeeProfile_id_fkey";

-- DropForeignKey
ALTER TABLE "PatientProfile" DROP CONSTRAINT "PatientProfile_employeeProfileId_fkey";

-- DropForeignKey
ALTER TABLE "PatientProfile" DROP CONSTRAINT "PatientProfile_id_fkey";

-- DropForeignKey
ALTER TABLE "Program" DROP CONSTRAINT "Program_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "_dependents" DROP CONSTRAINT "_dependents_A_fkey";

-- AlterTable
ALTER TABLE "Behavior" ALTER COLUMN "datatype" SET DEFAULT 'TRIAL',
ALTER COLUMN "trialsPerEntry" DROP NOT NULL;

-- AlterTable
ALTER TABLE "EmployeeProfile" DROP COLUMN "role",
ADD COLUMN     "Role" "Role" NOT NULL DEFAULT 'Technician',
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Program" DROP COLUMN "patientId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "patientId",
DROP COLUMN "userId",
ADD COLUMN     "studentId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone_number" DROP NOT NULL,
ALTER COLUMN "birthday" SET DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "PatientProfile";

-- CreateTable
CREATE TABLE "StudentProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "employeeProfileId" INTEGER,

    CONSTRAINT "StudentProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "Image" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_userId_key" ON "StudentProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Image_userId_key" ON "Image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeProfile_userId_key" ON "EmployeeProfile"("userId");

-- AddForeignKey
ALTER TABLE "EmployeeProfile" ADD CONSTRAINT "EmployeeProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_employeeProfileId_fkey" FOREIGN KEY ("employeeProfileId") REFERENCES "EmployeeProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Program" ADD CONSTRAINT "Program_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_dependents" ADD CONSTRAINT "_dependents_A_fkey" FOREIGN KEY ("A") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
