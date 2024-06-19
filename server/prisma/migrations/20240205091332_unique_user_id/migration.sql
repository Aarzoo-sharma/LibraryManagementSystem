/*
  Warnings:

  - You are about to drop the column `rollNo` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uniqueUserId]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - The required column `uniqueUserId` was added to the `user` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `User_rollNo_key` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `rollNo`,
    ADD COLUMN `uniqueUserId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_uniqueUserId_key` ON `user`(`uniqueUserId`);
