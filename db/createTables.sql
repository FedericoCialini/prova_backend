CREATE TABLE `test`.`projects` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `test`.`jobs` (`id` INT NOT NULL AUTO_INCREMENT,
                            `creationDate` DATETIME NOT NULL,
                            `price` FLOAT NOT NULL,
                            `status` ENUM('cancelled', 'delivered', 'in progress', 'in preparation') NULL,
                            `project_id` INT NOT NULL,
                            PRIMARY KEY (`id`),
                            FOREIGN KEY (`project_id`)
                            REFERENCES `test`.`projects` (`id`)
                            ON DELETE CASCADE );