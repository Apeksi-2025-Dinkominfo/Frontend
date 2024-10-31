/*
  Warnings:

  - Added the required column `pesawat` to the `DataMunas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `datamunas` ADD COLUMN `pesawat` VARCHAR(191) NOT NULL;
