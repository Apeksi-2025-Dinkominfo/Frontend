/*
  Warnings:

  - Added the required column `images` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `news` ADD COLUMN `images` VARCHAR(191) NOT NULL;
