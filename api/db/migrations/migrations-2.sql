-- MySQL Workbench Synchronization
-- Generated: 2024-04-19 12:28
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: USUARIO

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE TABLE IF NOT EXISTS `infodecdb`.`history` (
  `idHistory` INT(11) NOT NULL AUTO_INCREMENT,
  `weather` JSON NULL DEFAULT '{}',
  `currencyConversion` JSON NULL DEFAULT '{}',
  `dateCreated` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idHistory`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
