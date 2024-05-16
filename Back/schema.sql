-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8mb3 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `profil` VARCHAR(255) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;
 

-- -----------------------------------------------------
-- Table `mydb`.`facture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`facture` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fournisseur` VARCHAR(255) NOT NULL,
  `dossier` VARCHAR(255) NOT NULL,
  `date_fact` DATE NOT NULL,
  `periode_conso` VARCHAR(45) NOT NULL,
  `num_fact` VARCHAR(255) NOT NULL,
  `device` VARCHAR(255) NOT NULL,
  `montant` FLOAT NOT NULL,
  `objet` VARCHAR(255) NOT NULL,
  `num_po` VARCHAR(255) NOT NULL,
  `statut` VARCHAR(50) NOT NULL,
  `pathpdf` VARCHAR(255) NOT NULL,
  `date_receprion` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;



-- Listage de la structure de table mydb. archive
CREATE TABLE IF NOT EXISTS `archive` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fournisseur` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `dossier` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `date_fact` date NOT NULL,
  `periode_conso` varchar(45) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `num_fact` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `device` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `montant` float NOT NULL,
  `objet` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `num_po` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `statut` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `pathpdf` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NOT NULL,
  `date_receprion` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8mb3 ROW_FORMAT=DYNAMIC;




SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
