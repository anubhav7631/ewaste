-- =====================================================
-- Smart e-Waste Collection & Management System
-- MySQL Setup Script
-- Run this ONCE before starting the backend
-- =====================================================

-- 1. Create database
CREATE DATABASE IF NOT EXISTS ewaste_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE ewaste_db;

-- 2. Tables are auto-created by Spring Boot (ddl-auto=update)
--    But you can pre-create them here if preferred:

CREATE TABLE IF NOT EXISTS users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  NOT NULL UNIQUE,
    password    VARCHAR(255)  NOT NULL,
    phone       VARCHAR(20),
    address     TEXT,
    role        ENUM('ROLE_USER','ROLE_ADMIN') NOT NULL DEFAULT 'ROLE_USER',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS waste_requests (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id             BIGINT NOT NULL,
    device_type         VARCHAR(100) NOT NULL,
    device_description  TEXT,
    quantity            INT NOT NULL DEFAULT 1,
    image_url           VARCHAR(500),
    pickup_address      TEXT NOT NULL,
    preferred_date      DATE,
    scheduled_date      DATE,
    status              ENUM('PENDING','APPROVED','REJECTED','SCHEDULED','COMPLETED') NOT NULL DEFAULT 'PENDING',
    admin_notes         TEXT,
    created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at          DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Admin user is auto-seeded by Spring Boot on first startup
--    Email: admin@ewaste.com  |  Password: Admin@123
--    (See DataInitializer.java)

SELECT 'Database setup complete!' AS status;
