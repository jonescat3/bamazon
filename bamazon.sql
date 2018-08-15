
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  ID INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Huggies Diapers", 12.99, 60);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Slim Jim", 8.99, 10);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Cheez Its", 12.39, 36);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Elmers Glue", 10.00, 30);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Scotch Tape", 9.80, 6);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Planters Nuts", 8.90, 24);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Mott's Fruit Snacks", 6.58, 40);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Goldfish Snacks", 9.98, 30);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Snyder's Pretzels", 25.87, 48);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Granola Bars", 4.98, 24);
