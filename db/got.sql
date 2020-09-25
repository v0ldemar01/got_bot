-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema GameofThrones
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `GameofThrones` ;

-- -----------------------------------------------------
-- Schema GameofThrones
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `GameofThrones` DEFAULT CHARACTER SET utf8 ;
USE `GameofThrones` ;

-- -----------------------------------------------------
-- Table `GameofThrones`.`characters`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `GameofThrones`.`characters` ;

CREATE TABLE IF NOT EXISTS `GameofThrones`.`characters` (
  `id_character` INT NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(45) NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `family` VARCHAR(45) NOT NULL,
  `image` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`id_character`))
ENGINE = InnoDB;



