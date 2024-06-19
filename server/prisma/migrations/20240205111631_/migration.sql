/*
  Warnings:

  - You are about to alter the column `dateOfReturn` on the `issuebooks` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `issuebooks` ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'issued',
    MODIFY `dateOfReturn` DATETIME(3) NOT NULL;
