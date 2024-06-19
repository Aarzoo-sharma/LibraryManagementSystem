-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_email_key` TO `email`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_phone_no_key` TO `phone_no`;

-- RenameIndex
ALTER TABLE `user` RENAME INDEX `User_uniqueUserId_key` TO `uniqueUserId`;
