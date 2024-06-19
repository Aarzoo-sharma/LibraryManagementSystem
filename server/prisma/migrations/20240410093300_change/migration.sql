/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `adminlog` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `adminlog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `adminlog` ADD COLUMN `activeStatus` VARCHAR(191) NOT NULL DEFAULT 'active',
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `activeStatus` VARCHAR(191) NOT NULL DEFAULT 'active';

-- CreateIndex
CREATE UNIQUE INDEX `adminlog_email_key` ON `adminlog`(`email`);
