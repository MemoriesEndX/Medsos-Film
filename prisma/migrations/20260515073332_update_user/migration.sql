/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `points` on the `User` table. All the data in the column will be lost.
  - The primary key for the `VerificationToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier,token]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'CREATOR', 'COMPETITION_JUDGE', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('PERSONAL', 'STUDIO', 'ORGANIZED');

-- CreateEnum
CREATE TYPE "ProfessionRole" AS ENUM ('DIRECTOR', 'PRODUCER', 'SCREENWRITER', 'ACTOR', 'EDITOR', 'DOP', 'SOUND_DESIGNER', 'PRODUCTION_DESIGNER', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "age",
DROP COLUMN "level",
DROP COLUMN "points",
ADD COLUMN     "accountType" "AccountType" NOT NULL DEFAULT 'PERSONAL',
ADD COLUMN     "address" TEXT,
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "coverPhoto" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "professionRole" "ProfessionRole" NOT NULL DEFAULT 'OTHER',
ADD COLUMN     "profilePhoto" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "username" TEXT,
ADD COLUMN     "website" TEXT;

-- AlterTable
ALTER TABLE "VerificationToken" DROP CONSTRAINT "VerificationToken_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");
