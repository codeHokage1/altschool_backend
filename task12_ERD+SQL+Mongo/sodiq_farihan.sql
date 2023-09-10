-- /// A. CREATION OF ALL ENTITIES ///
-- Create Users entity
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    gender ENUM ("Male", "Female"),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

-- Create Admin entity
CREATE TABLE admin (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Customers entity
CREATE TABLE customers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create Categories entity
CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    active boolean DEFAULT true,
    PRIMARY KEY (id)
);

-- Create Items entity
CREATE TABLE items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT NOT NULL,
    size ENUM ("S", "M", "L"),
    discount INT NOT NULL,
    in_stock boolean DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    category_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Create Orders entity
CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    description VARCHAR(255) NOT NULL,
    status ENUM ("Approved", "Rejected"),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    delivery_location VARCHAR(255) NOT NULL,
    delivered boolean DEFAULT false,
    customer_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Create Items_Orders entity
CREATE TABLE items_orders (
    id INT NOT NULL AUTO_INCREMENT,
    item_id INT NOT NULL,
    order_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (item_id) REFERENCES items(id),
    FOREIGN KEY (order_id) REFERENCES orders(id)
);


-- /// B. INSERTION OF RECORDS INTO ENTITIES ///
-- Insert into Users entity
INSERT INTO users 
(id, name, email, password, phone_number, gender) VALUES 
(1, "Farhan", "farhansodiq360@gmail.com", "test1234", "+2347013578199", "Male"),
(2, "Sodiq", "sodiqfarhan360@gmail.com", "test1234", "+2348077751182", "Male");
-- Insert into Admin entity
INSERT INTO admin 
(id, name, email, password, user_id) VALUES 
(1, "Farhan", "farhansodiq360@gmail.com", "test1234", 1);
-- Insert into customers entity
INSERT INTO customers 
(id, name, email, password, address, phone_number, user_id) VALUES 
(1, "Sodiq", "sodiqfarhan360@gmail.com", "test1234", "Lagos, Nigeria", "+2348077751182", 2);
-- Insert into categories entity
INSERT INTO categories 
(id, name, description) VALUES 
(1, "Shoes", "Everything that makes your feet comfortable");
-- Insert into items entity
INSERT INTO items 
(id, name, description, price, size, discount, category_id) VALUES 
(1, "Lebron XX", "A beast. That's all you need to know", 300, "L", 5, 1);
-- Insert into orders entity
INSERT INTO orders
(id, description, status, delivery_location, customer_id) VALUES 
(1, "Lebron XX (x2)", "Approved", "Oshodi, Lagos, Nigeria", 1);
-- Insert into items_orders entity
INSERT INTO items_orders
(id, item_id, order_id) VALUES 
(1, 1, 1);


-- /// C. GETTING RECORDS FROM TWO OR MORE ENTITIES ///
SELECT * FROM users;
SELECT * FROM items;


-- /// D. UPDATING RECORDS IN TWO OR MORE ENTITIES ///
UPDATE users SET name = "Farhan S." WHERE id = 1;
UPDATE items SET price = 250 WHERE id = 1;


-- /// E. DELETING RECORDS FROM TWO OR MORE ENTITIES ///
DELETE FROM users WHERE id = 2;
DELETE FROM orders WHERE id = 1;
