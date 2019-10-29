DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

DROP TABLE IF EXISTS products;

CREATE TABLE products(
	item_id INTEGER (10) NOT NULL AUTO_INCREMENT,
 	product_name VARCHAR(100) NOT NULL,
 	department_name VARCHAR(100) NOT NULL,
 	price DECIMAL(10,2) NOT NULL,
 	stock_quantity INTEGER(10) NOT NULL,
 	PRIMARY KEY (item_id)
 );

SELECT * FROM products.csv;