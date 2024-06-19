-- CreateTable
CREATE TABLE `resetPassword` (
    `resetPasswordId` INTEGER NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(191) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `adminId` INTEGER NOT NULL,

    PRIMARY KEY (`resetPasswordId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `resetPassword` ADD CONSTRAINT `resetPAssword_adminlog_fKey` FOREIGN KEY (`adminId`) REFERENCES `adminlog`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
