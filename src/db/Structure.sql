DROP DATABASE IF EXISTS LaLetraDorada;
CREATE DATABASE LaLetraDorada;
USE LaLetraDorada;

CREATE TABLE `Users` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(50) NOT NULL,
  `lastName` VARCHAR(50) NOT NULL,
  `age` INT CHECK (age >= 0 AND age <= 110),
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` TEXT NOT NULL,
  `category` VARCHAR(20) NOT NULL,
  `child` TINYINT,
  `profileImg` TEXT,
  `idAddress` INT
);

CREATE TABLE `Addresses` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `street` VARCHAR(200) NOT NULL,
  `number` INT,
  `city` VARCHAR(100) NOT NULL,
  `postalCode` VARCHAR(10) NOT NULL
);

CREATE TABLE `Carts` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idUser` INT NOT NULL,
  `discount` DECIMAL(10,2) CHECK (discount > 0),
  `totalPrice` DECIMAL(10,2) CHECK (totalPrice > 0),
  `payMethod` VARCHAR(50)
);

CREATE TABLE `Shipments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(50),
  `price` DECIMAL(10,2) CHECK (price > 0)
);

CREATE TABLE `CartsShipments` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idCart` INT NOT NULL,
  `idShipment` INT NOT NULL
);

CREATE TABLE `Invoices` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idCart` INT NOT NULL,
  `type` VARCHAR(5) NOT NULL,
  `date` DATETIME NOT NULL,
  `totalPrice` DECIMAL(10,2) CHECK (totalPrice > 0),
  `payMethod` VARCHAR(50) NOT NULL
);

CREATE TABLE `Books` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(50) NOT NULL,
  `description` TEXT NOT NULL,
  `coverImg` VARCHAR(200) NOT NULL,
  `priceHardCover` DECIMAL(10,2) CHECK (priceHardCover > 0),
  `priceSoftCover` DECIMAL(10,2) CHECK (priceSoftCover > 0),
  `priceEpub` DECIMAL(10,2) CHECK (priceEpub > 0),
  `priceAudio` DECIMAL(10,2) CHECK (priceAudio > 0)
);

CREATE TABLE `Genres` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE `Authors` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `biography` TEXT NOT NULL
);

CREATE TABLE `BooksGenres` (
  `idBook` INT NOT NULL,
  `idGenre` INT NOT NULL,
  PRIMARY KEY (`idBook`, `idGenre`)
);

CREATE TABLE `CartsBooks` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `idCart` INT NOT NULL,
  `idBook` INT NOT NULL,
  `unitPrice` DECIMAL(10,2) CHECK (unitPrice > 0),
  `quantity` INT CHECK (quantity > 0),
  `subtotal` DECIMAL(10,2) CHECK (subtotal > 0)
);

CREATE TABLE `BooksAuthors` (
  `idBook` INT NOT NULL,
  `idAuthors` INT NOT NULL,
  PRIMARY KEY (`idBook`, `idAuthors`)
);

ALTER TABLE `Users` ADD FOREIGN KEY (`idAddress`) REFERENCES `Addresses` (`id`);
ALTER TABLE `Carts` ADD FOREIGN KEY (`idUser`) REFERENCES `Users` (`id`);
ALTER TABLE `CartsShipments` ADD FOREIGN KEY (`idCart`) REFERENCES `Carts` (`id`);
ALTER TABLE `CartsShipments` ADD FOREIGN KEY (`idShipment`) REFERENCES `Shipments` (`id`);
ALTER TABLE `Invoices` ADD FOREIGN KEY (`idCart`) REFERENCES `Carts` (`id`);
ALTER TABLE `CartsBooks` ADD FOREIGN KEY (`idCart`) REFERENCES `Carts` (`id`);
ALTER TABLE `CartsBooks` ADD FOREIGN KEY (`idBook`) REFERENCES `Books` (`id`);
ALTER TABLE `BooksGenres` ADD FOREIGN KEY (`idBook`) REFERENCES `Books` (`id`);
ALTER TABLE `BooksGenres` ADD FOREIGN KEY (`idGenre`) REFERENCES `Genres` (`id`);
ALTER TABLE `BooksAuthors` ADD FOREIGN KEY (`idBook`) REFERENCES `Books` (`id`);
ALTER TABLE `BooksAuthors` ADD FOREIGN KEY (`idAuthors`) REFERENCES `Authors` (`id`);