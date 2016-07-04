/*
SQLyog Ultimate v9.20 
MySQL - 5.6.24 : Database - sports_league
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sports_league` /*!40100 DEFAULT CHARACTER SET latin1 */;

/*Table structure for table `challenge` */

DROP TABLE IF EXISTS `challenge`;

CREATE TABLE `challenge` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `text` text,
  `round` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;

/*Table structure for table `challenge_text` */

DROP TABLE IF EXISTS `challenge_text`;

CREATE TABLE `challenge_text` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `text` text,
  `deadline` datetime DEFAULT NULL,
  `createdBy` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `county_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `coach_organization` */

DROP TABLE IF EXISTS `coach_organization`;

CREATE TABLE `coach_organization` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `coach_id` bigint(20) NOT NULL,
  `organization_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

/*Table structure for table `county` */

DROP TABLE IF EXISTS `county`;

CREATE TABLE `county` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `county_state` */

DROP TABLE IF EXISTS `county_state`;

CREATE TABLE `county_state` (
  `state_abv` varchar(50) NOT NULL,
  `county` varchar(50) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `longitude` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `league` */

DROP TABLE IF EXISTS `league`;

CREATE TABLE `league` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  `state` varchar(255) NOT NULL,
  `county` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Table structure for table `links` */

DROP TABLE IF EXISTS `links`;

CREATE TABLE `links` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `url` text NOT NULL,
  `posted_date` datetime NOT NULL,
  `title` varchar(500) NOT NULL,
  `team_id` bigint(20) NOT NULL,
  `challenge_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*Table structure for table `mytable` */

DROP TABLE IF EXISTS `mytable`;

CREATE TABLE `mytable` (
  `state_abv` varchar(50) NOT NULL,
  `county` varchar(50) NOT NULL,
  `lat` varchar(50) NOT NULL,
  `longitude` varchar(50) NOT NULL,
  PRIMARY KEY (`state_abv`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `state` */

DROP TABLE IF EXISTS `state`;

CREATE TABLE `state` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `team` */

DROP TABLE IF EXISTS `team`;

CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `coach_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

/*Table structure for table `team_player` */

DROP TABLE IF EXISTS `team_player`;

CREATE TABLE `team_player` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `team_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role_id` bigint(20) NOT NULL,
  `county` varchar(255) NOT NULL,
  `city` varchar(200) NOT NULL,
  `state` varchar(255) NOT NULL,
  `parent_consent` tinyint(4) NOT NULL,
  `parent_email` varchar(100) NOT NULL,
  `zip` varchar(255) NOT NULL,
  `league` varchar(255) NOT NULL,
  `picUrl` varchar(255) NOT NULL,
  `league_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `org_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

/*Table structure for table `video_rating` */

DROP TABLE IF EXISTS `video_rating`;

CREATE TABLE `video_rating` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `judge_id` int(11) NOT NULL,
  `rating` bigint(20) NOT NULL,
  `link_id` int(11) NOT NULL,
  `creativity` bigint(20) NOT NULL,
  `artistic` bigint(20) NOT NULL,
  `logic` bigint(20) NOT NULL,
  `problem_solved` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
