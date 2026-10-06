-- Optional legacy MySQL schema for a future company-owned backend.
-- This file is NOT used by the current static WASA website.
CREATE DATABASE IF NOT EXISTS `wasa_legacy`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `wasa_legacy`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `openId` VARCHAR(64) NOT NULL,
  `name` TEXT NULL,
  `email` VARCHAR(320) NULL,
  `loginMethod` VARCHAR(64) NULL,
  `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `brandInquiries` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `brandName` VARCHAR(200) NOT NULL,
  `contactName` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `email` VARCHAR(320) NOT NULL,
  `brandIntroduction` TEXT NOT NULL,
  `inquiryMessage` VARCHAR(5000) NOT NULL DEFAULT '',
  `privacyConsent` BOOLEAN NOT NULL DEFAULT FALSE,
  `privacyConsentAt` TIMESTAMP NULL DEFAULT NULL,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
