-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema infodecdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema infodecdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `infodecdb` DEFAULT CHARACTER SET utf8 ;
USE `infodecdb` ;

-- -----------------------------------------------------
-- Table `infodecdb`.`countries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infodecdb`.`countries` (
  `idCountry` INT NOT NULL AUTO_INCREMENT,
  `cca2` VARCHAR(45) NOT NULL,
  `cca3` VARCHAR(45) NOT NULL,
  `commonName` VARCHAR(45) NOT NULL,
  `translationKey` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idCountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `infodecdb`.`cities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `infodecdb`.`cities` (
  `idCity` INT NOT NULL AUTO_INCREMENT,
  `idCountry` INT NOT NULL,
  `commonName` VARCHAR(45) NOT NULL,
  `translationKey` VARCHAR(45) NOT NULL,
  `dateCreated` DATETIME NOT NULL DEFAULT current_timestamp(),
  `dateUpdated` DATETIME NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`idCity`),
  INDEX `fk_countries_idCountry_idx` (`idCountry` ASC),
  CONSTRAINT `fk_countries_idCountry`
    FOREIGN KEY (`idCountry`)
    REFERENCES `infodecdb`.`countries` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
