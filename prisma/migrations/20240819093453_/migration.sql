/*
  Warnings:

  - Added the required column `updatedAt` to the `TimedTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimedTask" ADD COLUMN     "startedAt" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
