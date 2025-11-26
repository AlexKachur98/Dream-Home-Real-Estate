-- MySQL dump 10.13  Distrib 8.4.7, for Linux (x86_64)
--
-- Host: mysql-dbproject-dh-mgoodie-ce2d.g.aivencloud.com    Database: dreamhome
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '0cd56ec1-c31a-11f0-9742-862ccfb023a4:1-53,
a8dcff7e-b8c8-11f0-b393-862ccfb05470:1-33';

--
-- Table structure for table `Branches`
--

DROP TABLE IF EXISTS `Branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branches` (
  `branch_no` varchar(10) NOT NULL,
  `street` varchar(255) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postcode` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`branch_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Clients`
--

DROP TABLE IF EXISTS `Clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clients` (
  `client_id` varchar(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `preferred_contact` enum('email','phone','sms') NOT NULL,
  `notes` text,
  `registration_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`client_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Inquiries`
--

DROP TABLE IF EXISTS `Inquiries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Inquiries` (
  `inquiry_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `inquirer_name` varchar(100) DEFAULT NULL,
  `inquirer_email` varchar(255) DEFAULT NULL,
  `inquirer_phone` varchar(20) DEFAULT NULL,
  `question` text NOT NULL,
  `response` text,
  `status` enum('open','answered','closed') DEFAULT 'open',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inquiry_id`),
  KEY `property_id` (`property_id`),
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Inquiries_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `Inquiries_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE SET NULL,
  CONSTRAINT `Inquiries_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Properties`
--

DROP TABLE IF EXISTS `Properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Properties` (
  `property_id` varchar(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `price` decimal(12,2) NOT NULL,
  `status` varchar(50) NOT NULL,
  `beds` int DEFAULT NULL,
  `baths` decimal(3,1) DEFAULT NULL,
  `area` varchar(50) DEFAULT NULL,
  `lot_size` varchar(50) DEFAULT NULL,
  `year_built` int DEFAULT NULL,
  `monthly_fees` decimal(10,2) DEFAULT NULL,
  `type` varchar(100) NOT NULL,
  `hero_image` varchar(255) DEFAULT NULL,
  `description` text,
  `lifestyle_narrative` text,
  `neighborhood` text,
  `walk_score` int DEFAULT NULL,
  `transit_score` int DEFAULT NULL,
  `open_house` varchar(100) DEFAULT NULL,
  `mls_number` varchar(50) DEFAULT NULL,
  `taxes` decimal(10,2) DEFAULT NULL,
  `last_updated` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `agent_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`property_id`),
  KEY `agent_id` (`agent_id`),
  CONSTRAINT `Properties_ibfk_1` FOREIGN KEY (`agent_id`) REFERENCES `Staff` (`staff_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Documents`
--

DROP TABLE IF EXISTS `Property_Documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Documents` (
  `document_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `document_url` varchar(255) NOT NULL,
  `label` varchar(100) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Documents_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Floorplans`
--

DROP TABLE IF EXISTS `Property_Floorplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Floorplans` (
  `floorplan_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `label` varchar(100) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`floorplan_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Floorplans_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Gallery`
--

DROP TABLE IF EXISTS `Property_Gallery`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Gallery` (
  `gallery_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_hero` tinyint(1) DEFAULT '0',
  `order` int DEFAULT NULL,
  PRIMARY KEY (`gallery_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Gallery_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Highlights`
--

DROP TABLE IF EXISTS `Property_Highlights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Highlights` (
  `highlight_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `highlight_text` varchar(255) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`highlight_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Highlights_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Nearby`
--

DROP TABLE IF EXISTS `Property_Nearby`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Nearby` (
  `nearby_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `item` varchar(100) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`nearby_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Nearby_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Schools`
--

DROP TABLE IF EXISTS `Property_Schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Schools` (
  `school_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `distance` varchar(50) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`school_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Schools_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Sustainability`
--

DROP TABLE IF EXISTS `Property_Sustainability`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Sustainability` (
  `sustainability_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `feature` varchar(255) NOT NULL,
  `order` int DEFAULT NULL,
  PRIMARY KEY (`sustainability_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Sustainability_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Property_Tags`
--

DROP TABLE IF EXISTS `Property_Tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Property_Tags` (
  `tag_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `tag` varchar(50) NOT NULL,
  PRIMARY KEY (`tag_id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `Property_Tags_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Showings`
--

DROP TABLE IF EXISTS `Showings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Showings` (
  `showing_id` int NOT NULL AUTO_INCREMENT,
  `property_id` varchar(20) NOT NULL,
  `client_id` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `requested_by_name` varchar(100) DEFAULT NULL,
  `requested_by_email` varchar(255) DEFAULT NULL,
  `requested_by_phone` varchar(20) DEFAULT NULL,
  `requested_time` datetime NOT NULL,
  `status` enum('requested','confirmed','completed','cancelled') DEFAULT 'requested',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`showing_id`),
  KEY `property_id` (`property_id`),
  KEY `client_id` (`client_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Showings_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `Properties` (`property_id`) ON DELETE CASCADE,
  CONSTRAINT `Showings_ibfk_2` FOREIGN KEY (`client_id`) REFERENCES `Clients` (`client_id`) ON DELETE SET NULL,
  CONSTRAINT `Showings_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Staff`
--

DROP TABLE IF EXISTS `Staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Staff` (
  `staff_id` varchar(10) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `position` varchar(100) NOT NULL,
  `branch_no` varchar(10) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `salary` decimal(10,2) NOT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `hire_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `email` (`email`),
  KEY `branch_no` (`branch_no`),
  CONSTRAINT `Staff_ibfk_1` FOREIGN KEY (`branch_no`) REFERENCES `Branches` (`branch_no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UserApprovals`
--

DROP TABLE IF EXISTS `UserApprovals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserApprovals` (
  `approval_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `approved_by` int NOT NULL,
  `approved_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`approval_id`),
  KEY `user_id` (`user_id`),
  KEY `approved_by` (`approved_by`),
  CONSTRAINT `UserApprovals_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `UserApprovals_ibfk_2` FOREIGN KEY (`approved_by`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `UserProfiles`
--

DROP TABLE IF EXISTS `UserProfiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserProfiles` (
  `profile_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `UserProfiles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('agent','manager','support','admin') DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '0',
  `is_approved` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'dreamhome'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 18:22:24
