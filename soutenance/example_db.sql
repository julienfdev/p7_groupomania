-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.2

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

--
-- Table structure for table `Categories`
--

DROP TABLE IF EXISTS `Categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Categories`
--

LOCK TABLES `Categories` WRITE;
/*!40000 ALTER TABLE `Categories` DISABLE KEYS */;
INSERT INTO `Categories` VALUES (1,'fun','Fun','On se marre comme des oufs!','2020-10-09 09:00:47','2020-10-09 09:00:47'),(2,'wow','Wow','Hallucinant!','2020-10-09 09:00:47','2020-10-09 09:00:47'),(3,'chats','Chats','Internet sans les chats, c\'est vide!','2020-10-09 09:00:47','2020-10-09 09:00:47');
/*!40000 ALTER TABLE `Categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Comments`
--

DROP TABLE IF EXISTS `Comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `post_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Comments`
--

LOCK TABLES `Comments` WRITE;
/*!40000 ALTER TABLE `Comments` DISABLE KEYS */;
INSERT INTO `Comments` VALUES (1,'ouaaaaisss97072','Ouaaaaissss super!!!! 👌 Au top Groupomania','2020-10-29 09:08:08','2020-10-29 09:08:17',1,2),(2,'jose-pas-l97757','José pas le dire!','2020-10-29 09:09:57','2020-10-29 09:09:57',1,4),(3,'tes-lourd10332','T\'es lourd José','2020-10-29 09:10:10','2020-10-29 09:10:10',1,3),(4,'haha-mais01731','Haha mais grave c\'est trop lui 😂😂','2020-10-29 10:06:41','2020-10-29 10:06:41',3,4),(5,'sacre-bern35384','Sacré Bernard! 😤','2020-10-29 10:07:15','2020-10-29 10:07:15',3,6),(6,'pffffffff07901','Pffffffff!! JE RAGE JAMAIS 🤬🤬','2020-10-29 10:08:27','2020-10-29 10:08:27',3,3),(7,'haha-steph31600','Haha Steph c\'est trop ça','2020-10-29 10:12:11','2020-10-29 10:12:11',3,1),(8,'cours-stee95653','Cours Steeve! ','2020-10-29 10:13:15','2020-10-29 10:13:15',4,1);
/*!40000 ALTER TABLE `Comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `like_status` tinyint NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `post_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_id` (`post_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `Posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES (1,1,'2020-10-29 09:09:00','2020-10-29 09:09:00',1,2),(2,1,'2020-10-29 09:09:09','2020-10-29 09:09:09',1,1),(3,1,'2020-10-29 09:09:29','2020-10-29 09:09:29',1,3),(4,-1,'2020-10-29 09:09:40','2020-10-29 09:09:40',1,5),(5,1,'2020-10-29 10:06:03','2020-10-29 10:06:03',3,5),(6,1,'2020-10-29 10:07:22','2020-10-29 10:07:22',3,6),(7,-1,'2020-10-29 10:08:07','2020-10-29 10:08:07',3,3),(8,1,'2020-10-29 10:08:08','2020-10-29 10:08:08',2,3),(9,1,'2020-10-29 10:11:57','2020-10-29 10:11:57',2,1),(10,1,'2020-10-29 10:12:00','2020-10-29 10:12:00',3,1),(11,1,'2020-10-29 10:12:51','2020-10-29 10:12:51',4,4),(12,1,'2020-10-29 10:13:48','2020-10-29 10:13:48',4,6),(13,1,'2020-10-29 10:13:55','2020-10-29 10:13:55',4,2),(14,1,'2020-10-29 10:14:03','2020-10-29 10:14:03',4,5);
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Posts`
--

DROP TABLE IF EXISTS `Posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `likes` int DEFAULT '0',
  `image_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_hot` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `Posts_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `Categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Posts`
--

LOCK TABLES `Posts` WRITE;
/*!40000 ALTER TABLE `Posts` DISABLE KEYS */;
INSERT INTO `Posts` VALUES (1,'bienvenue60068',2,'http://localhost:3000/public/images/bienvenue.jpg1603962432441.jpg','Bienvenue sur LolGag by Groupomania! 🎉',1,'2020-10-29 09:07:12','2020-10-29 09:09:40',2,1),(2,'hello-les76305',2,'http://localhost:3000/public/images/forrest.gif1603964776282.gif','Hello les collègues!',0,'2020-10-29 09:46:16','2020-10-29 10:11:57',1,2),(3,'bernard-qu59886',2,'http://localhost:3000/public/images/rage.jpg1603965959878.jpg','Bernard quand il sort de réunion',0,'2020-10-29 10:05:59','2020-10-29 10:12:00',1,5),(4,'steeve-qua68208',4,'http://localhost:3000/public/images/bus.gif1603966368187.gif','Steeve quand il va prendre le bus',1,'2020-10-29 10:12:48','2020-10-29 10:14:03',1,4);
/*!40000 ALTER TABLE `Posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `slug` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nickname` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `isAdmin` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `nickname` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admingroup89924','admin@groupomania.com','AdminGroupo','$2b$10$5OKSNq2UhzsaBCj46i1b5uvzW1phnTSpEez7m9WSsgvqQLwGjVs.2',1,'2020-10-29 09:04:49','2020-10-29 09:04:49'),(2,'steeve1847092','steeve@groupomania.com','Steeve18','$2b$10$NvYJfVED4IsaA150kOPFTOSXr4gefRHOaok7nsJO8c3oy1vNxIvdy',0,'2020-10-29 09:05:47','2020-10-29 09:05:47'),(3,'bernard3160354','bernard@gmail.com','Bernard31','$2b$10$RWyMqIHG7Bc.Ggo0x7KWlOXSK8YZWn/9YSKJn7jgZrsHy9ixtHQsC',0,'2020-10-29 09:06:00','2020-10-29 09:06:00'),(4,'josepasldi82232','jose@caramail.com','JoséPasldire','$2b$10$kmzrfGQWJesMREzKkB5/xe0XPtGT8LrHsZ/6faMqukGG/S6s7X646',0,'2020-10-29 09:06:22','2020-10-29 09:06:22'),(5,'stephlol98832','stephanie@aol.com','StephLol','$2b$10$XTdh2bDznyKlIQ1FQgKq/.aG.TNEyHuEZKUgJre4.uBj4gHGKn7xW',0,'2020-10-29 09:06:38','2020-10-29 09:06:38'),(6,'kmiyou14336','camille@groupomania.com','Kmiyou','$2b$10$fRz3/SVNRq8bTEaFEM29Ie6UK1zuUzf14kFwf8df56RnqlfAQOjLC',0,'2020-10-29 09:06:54','2020-10-29 09:06:54');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-29 14:45:09
