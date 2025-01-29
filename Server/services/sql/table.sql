-- Create Users Table
CREATE TABLE IF NOT EXISTS `Users` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hashed` VARCHAR(255) NOT NULL,
    `role` VARCHAR(50) NOT NULL,
    `active_status` TINYINT(1) NOT NULL DEFAULT 1,
    `updated_by` VARCHAR(50) DEFAULT 'system',
    `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Blogs Table
CREATE TABLE IF NOT EXISTS `blogs` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `content` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Ratings Table
CREATE TABLE IF NOT EXISTS `ratings` (
    `blog_id` INT NOT NULL,
    `rating` INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    `user_id` INT NOT NULL,
    PRIMARY KEY (`blog_id`, `user_id`),
    FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Comments Table
CREATE TABLE IF NOT EXISTS `comments` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `blog_id` INT NOT NULL,
    `comment` TEXT NOT NULL,
    `user_id` INT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create Default Admin Privileges (optional)
CREATE TABLE IF NOT EXISTS `user_privileges` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `privilege` VARCHAR(255) NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `Users`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Add default privileges for the admin user
INSERT INTO `user_privileges` (`user_id`, `privilege`)
SELECT `user_id`, 'All Privileges'
FROM `Users`
WHERE `username` = 'admin'
ON DUPLICATE KEY UPDATE 
    `privilege` = VALUES(`privilege`);

-- Create Table for Health Tips (if applicable)
CREATE TABLE IF NOT EXISTS `health_tips` (
    `health_tip_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `health_tip_title` VARCHAR(255) NOT NULL,
    `health_tip_detail` TEXT NOT NULL,
    `health_tip_description` TEXT NOT NULL,
    `health_tip_link` VARCHAR(255),
    `health_tip_video_link` VARCHAR(255),
    `health_tip_image` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Optional: Insert test data into health tips
INSERT INTO `health_tips` (`health_tip_title`, `health_tip_detail`, `health_tip_description`)
VALUES 
    ('Test Health Tip', 'Test Detail', 'Test Description');

-- Create Contact Table for user inquiries
CREATE TABLE IF NOT EXISTS `contacts` (
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `subject` VARCHAR(255),
    `message` TEXT NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
