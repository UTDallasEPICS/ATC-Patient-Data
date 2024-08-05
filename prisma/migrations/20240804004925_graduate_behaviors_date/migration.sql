/*
  Warnings:

  - The `graduated` column on the `Behavior` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Behavior" DROP COLUMN "graduated",
ADD COLUMN     "graduated" TIMESTAMP(3);
