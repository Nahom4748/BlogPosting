-- Create Users Table
CREATE TABLE IF NOT EXISTS `Users` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hashed` VARCHAR(255) NOT NULL,
    ` bio` TEXT DEFAULT NULL,
  `profile_picture` VARCHAR(255) DEFAULT NULL,
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

