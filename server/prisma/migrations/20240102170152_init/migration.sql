-- CreateTable
CREATE TABLE `adminlog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `empName` VARCHAR(255) NULL,
    `createdByEmp` VARCHAR(255) NULL,

    UNIQUE INDEX `username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `bookId` INTEGER NOT NULL AUTO_INCREMENT,
    `author` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `place_publisher` VARCHAR(255) NOT NULL,
    `edition` VARCHAR(255) NOT NULL,
    `year` INTEGER NOT NULL,
    `pages` INTEGER NOT NULL,
    `source` VARCHAR(255) NOT NULL,
    `billNo` INTEGER NOT NULL,
    `BillDate` DATETIME(3) NOT NULL,
    `cost` DOUBLE NOT NULL,
    `issuedTo` VARCHAR(255) NOT NULL DEFAULT '',
    `updatedByEmp` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`bookId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issuebooks` (
    `issuedBookId` INTEGER NOT NULL AUTO_INCREMENT,
    `bookId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `dateOfIssue` DATETIME(3) NOT NULL,
    `dateOfReturn` DATETIME(3) NOT NULL,
    `fine` DOUBLE NOT NULL DEFAULT 0,
    `issuedByEmp` VARCHAR(191) NOT NULL,
    `collectedByEmp` VARCHAR(191) NOT NULL,

    INDEX `issueBooks_bookId_fkey`(`bookId`),
    INDEX `issueBooks_userId_fkey`(`userId`),
    PRIMARY KEY (`issuedBookId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `userId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `rollNo` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_no` INTEGER NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `semester` INTEGER NOT NULL,
    `createdByEmp` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_rollNo_key`(`rollNo`),
    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_no_key`(`phone_no`),
    PRIMARY KEY (`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `issuebooks` ADD CONSTRAINT `issueBooks_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`bookId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issuebooks` ADD CONSTRAINT `issueBooks_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
