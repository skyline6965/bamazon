DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;
CREATE TABLE products(	
    id INT (10) AUTO_INCREMENT NOT NULL
    item_id INT (10) NOT NULL
    product_name VARCHAR (100) NOT NULL,
    dept_name VARCHAR (50),
    price DEC (10,2),
    stock INT (50),
    PRIMARY KEY (id)
    );
    
INSERT INTO products(item_id, product_name, dept_name, price, stock)
VALUES 
(1, "Rolex", "Acc.", 100.00, 5),
(2, "Laptop", "Tech.", 600.00, 8),
(3, "Tablet", "Tech.", 300.00, 7),
(4, "TV", "Tech.", 500.00, 4),
(5, "Dinning Table", "Furniture", 300.00, 2),
(6, "Dinning Chairs", "Furniture", 30.00, 8),
(7, "Backpack", "Misc.", 40.00, 10),
(8, "Weight Set", "Sports", 200.00, 4),
(9, "Ps4", "Tech.", 400.00, 6),
(10, "Guitar", "Misc.", 1000.00, 2)

