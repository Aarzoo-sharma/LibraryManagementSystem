-- AlterTable
ALTER TABLE `adminlog` MODIFY `email` VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `activeStatus` VARCHAR(255) NOT NULL DEFAULT 'active';
