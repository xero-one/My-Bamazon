CREATE DATABASE bamazon;
USE bamazon;


CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(20) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(10) NOT NULL,
	product_sales INTEGER(10) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity, product_sales)
VALUES (1,'NBA 2K21','Games',59.99,20,0),(2,'FIFA 21','Game',59.99,20,0),(3,'Avengers End Game','Movies',15.99,10,0),(4,'Balenciaga Speed Sneakers','Shoes',780,5,0),(5,'MacBook Pro','Electronics',1700,10,0),(6,'FL Studio 21','Electronics',999.99,30,0),(7,'Nike Joggers','Clothing',99.99,25,0),(8,'Oil Paints','Arts & Crafts',9.99,70,0),(9,'Louis Vuitton Damier Graphite Josh Backpack','Clothing',1890,1,0),(10,'Custom Full Face DJ Mask','Clothing',50000,1,0),(11,'LG C9 65 inch Class 4K Smart OLED TV w/ AI ThinQ','Electronics',1499.99,15,0);
