/*
  Warnings:

  - Added the required column `secret` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "secret" VARCHAR(64) NOT NULL;
