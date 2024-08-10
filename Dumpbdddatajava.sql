-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: datajava
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `langage`
--

DROP TABLE IF EXISTS `langage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `langage` (
  `idLangage` int NOT NULL AUTO_INCREMENT,
  `nameLangage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idLangage`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `langage`
--

LOCK TABLES `langage` WRITE;
/*!40000 ALTER TABLE `langage` DISABLE KEYS */;
INSERT INTO `langage` VALUES (1,'Php'),(2,'Java'),(3,'React'),(4,'Node'),(5,'Angular'),(6,'C+'),(7,'popo+');
/*!40000 ALTER TABLE `langage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notation`
--

DROP TABLE IF EXISTS `notation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notation` (
  `idNotation` int NOT NULL AUTO_INCREMENT,
  `note` double NOT NULL,
  `dateNote` date NOT NULL,
  `student_id` int DEFAULT NULL,
  `school_id` int DEFAULT NULL,
  `langage_id` int DEFAULT NULL,
  PRIMARY KEY (`idNotation`),
  KEY `student_id` (`student_id`),
  KEY `school_id` (`school_id`),
  KEY `langage_id` (`langage_id`),
  CONSTRAINT `notation_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`idStudent`) ON DELETE CASCADE,
  CONSTRAINT `notation_ibfk_2` FOREIGN KEY (`school_id`) REFERENCES `school` (`idSchool`) ON DELETE CASCADE,
  CONSTRAINT `notation_ibfk_3` FOREIGN KEY (`langage_id`) REFERENCES `langage` (`idLangage`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notation`
--

LOCK TABLES `notation` WRITE;
/*!40000 ALTER TABLE `notation` DISABLE KEYS */;
INSERT INTO `notation` VALUES (1,18,'2024-01-15',4,2,4),(2,15,'2024-01-15',12,2,4),(3,17,'2024-02-15',4,2,4),(4,18,'2024-02-15',12,2,4),(5,13,'2024-01-16',4,2,3),(6,15,'2024-01-16',12,2,3),(7,16,'2024-02-16',4,2,3),(8,18,'2024-02-16',12,2,3);
/*!40000 ALTER TABLE `notation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `idSchool` int NOT NULL AUTO_INCREMENT,
  `nameSchool` varchar(255) DEFAULT NULL,
  `photoSchool` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idSchool`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'JavaSchool','School1.webp'),(2,'StarSChool','School2.webp'),(7,'coco3',NULL);
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_has_langage`
--

DROP TABLE IF EXISTS `school_has_langage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_has_langage` (
  `idSchool` int NOT NULL,
  `idLangage` int NOT NULL,
  PRIMARY KEY (`idSchool`,`idLangage`),
  KEY `idLangage` (`idLangage`),
  CONSTRAINT `school_has_langage_ibfk_1` FOREIGN KEY (`idSchool`) REFERENCES `school` (`idSchool`),
  CONSTRAINT `school_has_langage_ibfk_2` FOREIGN KEY (`idLangage`) REFERENCES `langage` (`idLangage`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_has_langage`
--

LOCK TABLES `school_has_langage` WRITE;
/*!40000 ALTER TABLE `school_has_langage` DISABLE KEYS */;
INSERT INTO `school_has_langage` VALUES (1,1),(7,1),(1,2),(2,3),(7,3),(2,4),(1,5),(7,5);
/*!40000 ALTER TABLE `school_has_langage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `idStudent` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `birthday` datetime(6) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `idSchool` int DEFAULT NULL,
  PRIMARY KEY (`idStudent`),
  KEY `fk_school` (`idSchool`),
  CONSTRAINT `fk_school` FOREIGN KEY (`idSchool`) REFERENCES `school` (`idSchool`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
INSERT INTO `student` VALUES (1,'Dupont','Martin','2000-02-01 00:00:00.000000','Martin_Dupont.webp',1),(4,'Curie','Marie','2000-12-14 00:00:00.000000','Marie_Curie.webp',2),(11,'Bonnet','Arthur','2000-05-22 00:00:00.000000','Arthur_Bonnet.webp',1),(12,'Gustave','Emilie','2001-03-14 00:00:00.000000','Emilie_Gustave.webp',2),(21,'Woody','woodpecker2','2017-06-05 02:00:00.000000','39971.png',1);
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_has_langage`
--

DROP TABLE IF EXISTS `student_has_langage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_has_langage` (
  `idStudent` int NOT NULL,
  `idLangage` int NOT NULL,
  PRIMARY KEY (`idStudent`,`idLangage`),
  KEY `fk_Student_has_Langage_Langage1_idx` (`idLangage`),
  KEY `fk_Student_has_Langage_Student1_idx` (`idStudent`),
  CONSTRAINT `fk_Student_has_Langage_Langage1` FOREIGN KEY (`idLangage`) REFERENCES `langage` (`idLangage`),
  CONSTRAINT `FKnkbw138osm3ydwigsvr2r8adb` FOREIGN KEY (`idStudent`) REFERENCES `student` (`idStudent`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_has_langage`
--

LOCK TABLES `student_has_langage` WRITE;
/*!40000 ALTER TABLE `student_has_langage` DISABLE KEYS */;
INSERT INTO `student_has_langage` VALUES (1,1),(21,1),(1,2),(11,2),(4,3),(12,3),(4,4),(12,4),(11,5),(21,5);
/*!40000 ALTER TABLE `student_has_langage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test`
--

DROP TABLE IF EXISTS `test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test` (
  `idtest` int NOT NULL AUTO_INCREMENT,
  `testcol` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idtest`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test`
--

LOCK TABLES `test` WRITE;
/*!40000 ALTER TABLE `test` DISABLE KEYS */;
INSERT INTO `test` VALUES (1,'Sample data'),(2,'Sample dataB'),(3,'Sample dataC'),(4,'Sample datad');
/*!40000 ALTER TABLE `test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userId` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'ADMIN','$2a$10$r5piy0ZWJu772G21BJW8E.B0H3Ub3fz74NHNkPSo5vsmH6eaf2yKu'),(2,'ADMIN2','$2a$10$r5piy0ZWJu772G21BJW8E.B0H3Ub3fz74NHNkPSo5vsmH6eaf2yKu');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-10 21:34:26
