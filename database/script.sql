-- -----------------------------------------------------
-- Schema ecommerce
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `ecommerce` ;

-- -----------------------------------------------------
-- Schema ecommerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ecommerce` ;

-- Create User_Profile table
CREATE TABLE `User_Profile` (
  `User_ID` int NOT NULL,
  `First_Name` varchar(255) DEFAULT NULL,
  `Last_Name` varchar(255) DEFAULT NULL,
  `Date_of_Birth` date DEFAULT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Shopping_Cart table with an auto-increment Cart_ID
CREATE TABLE `Shopping_Cart` (
  `Cart_ID` INT NOT NULL AUTO_INCREMENT,
  `User_ID` INT DEFAULT NULL,
  `Cart_DateTime` DATETIME DEFAULT NULL,
  `Status` VARCHAR(20) DEFAULT NULL,
  `Total` DECIMAL(10,2) DEFAULT NULL,
  PRIMARY KEY (`Cart_ID`),
  KEY `shopping_cart_ibfk_1` (`User_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Product_Catalog table
CREATE TABLE `Product_Catalog` (
  `Product_ID` INT NOT NULL AUTO_INCREMENT,
  `Product_Name` VARCHAR(255) DEFAULT NULL,
  `Description` TEXT,
  `Price` DECIMAL(10,2) DEFAULT NULL,
  `Category` VARCHAR(50) DEFAULT NULL,
  `Product_Images` TEXT,
  `Artist` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Orders table
CREATE TABLE `Orders` (
  `Order_ID` INT NOT NULL AUTO_INCREMENT,
  `Cart_ID` INT DEFAULT NULL,
  `Order_DateTime` DATETIME DEFAULT NULL,
  `Order_Status` VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (`Order_ID`),
  KEY `Cart_ID` (`Cart_ID`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`Cart_ID`) REFERENCES `Shopping_Cart` (`Cart_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create Cart_Items table
CREATE TABLE `Cart_Items` (
  `Cart_Item_ID` INT NOT NULL AUTO_INCREMENT,
  `Cart_ID` INT DEFAULT NULL,
  `Product_ID` INT DEFAULT NULL,
  `Quantity` INT DEFAULT NULL,
  PRIMARY KEY (`Cart_Item_ID`),
  KEY `Cart_ID` (`Cart_ID`),
  KEY `Product_ID` (`Product_ID`),
  CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`Cart_ID`) REFERENCES `Shopping_Cart` (`Cart_ID`),
  CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`Product_ID`) REFERENCES `Product_Catalog` (`Product_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO Product_Catalog (Product_Name, Description, Price, Category, Product_Images, Artist)
VALUES
    ('Neon Jungle', 'A mix of nature and neon lights creating a surreal experience.', 0.7, 'Landscapes', 'https://source.unsplash.com/featured/?digitalart,neon,nature', 'Bob Dylan'),
    ('Robot Uprising', 'A city dominated by robots, set in a dystopian future.', 1.4, 'Cityscapes', 'https://source.unsplash.com/featured/?digitalart,robots', 'Charlie Puth'),
    ('Galactic Warrior', 'A fierce warrior from a galaxy far away.', 0.9, 'Characters', 'https://source.unsplash.com/featured/?digitalart,galaxy,warrior', 'Dua Lipa'),
    ('Floating Islands', 'Mystical islands floating above the clouds.', 1.0, 'Landscapes', 'https://source.unsplash.com/featured/?digitalart,islands', 'Ed Sheeran'),
    ('Underwater Metropolis', 'A bustling city beneath the waves, home to the merfolk.', 1.1, 'Cityscapes', 'https://source.unsplash.com/featured/?digitalart,underwater,city', 'Fiona Apple'),
    ('Alien Princess', 'A royal character from an alien civilization.', 0.6, 'Characters', 'https://source.unsplash.com/featured/?digitalart,alien', 'Gwen Stefani'),
    ('Mystic Mountains', 'Towering peaks with a touch of fantasy.', 0.85, 'Landscapes', 'https://source.unsplash.com/featured/?digitalart,mountain,fantasy', 'Harry Styles'),
    ('Techno Downtown', 'The heart of a city, with a cybernetic twist.', 1.3, 'Cityscapes', 'https://source.unsplash.com/featured/?digitalart,downtown,cybernetic', 'Iggy Pop'),
    ('Desert Nomad', 'A wanderer of the digital dunes.', 0.65, 'Characters', 'https://source.unsplash.com/featured/?digitalart,desert,nomad', 'Janelle MonÃ¡e'),
    ('Cosmic Waterfalls', 'Waterfalls cascading from the stars.', 0.95, 'Landscapes', 'https://source.unsplash.com/featured/?digitalart,cosmic,waterfalls', 'Keith Urban'),
    ('Neon Marketplace', 'A buzzing market set in neon-lit alleyways.', 1.15, 'Cityscapes', 'https://source.unsplash.com/featured/?digitalart,neon,marketplace', 'Lizzo'),
    ('Digital Druid', 'A mystical character harnessing the power of the pixels.', 0.75, 'Characters', 'https://source.unsplash.com/featured/?digitalart,druid,mystical', 'Miley Cyrus');

INSERT INTO `ecommerce`.`user_profile` (`User_ID`, `First_Name`, `Last_Name`, `Date_of_Birth`) 
VALUES
(1, 'John', 'Doe', '1990-05-15');

INSERT INTO `ecommerce`.`shopping_cart` (`Cart_ID`, `User_ID`, `Cart_DateTime`, `Status`, `Total`) VALUES
(1, 1, NOW(), 'Incomplete', 0.00);
