CREATE DATABASE IF NOT EXISTS costume_rental;
USE costume_rental;

-- Customers table
CREATE TABLE customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  gender ENUM('Male','Female','Other') DEFAULT 'Other',
  address TEXT
);

-- Costumes table
CREATE TABLE costumes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  age_group ENUM('Kids','Adults') NOT NULL,
  gender ENUM('Boys','Girls','Male','Female') NOT NULL,
  type VARCHAR(50) NOT NULL,
  size VARCHAR(10) NOT NULL,
  image VARCHAR(255)
);

-- Orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  costume_id INT,
  customer_id INT,
  quantity INT DEFAULT 1,
  rental_days INT DEFAULT 1,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (costume_id) REFERENCES costumes(id),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- Insert sample data
INSERT INTO customers (name, gender, address) VALUES
('Alice', 'Female', 'Hyderabad'),
('Bob', 'Male', 'Chennai');

INSERT INTO costumes (name, age_group, gender, type, size, image) VALUES
('Superman', 'Kids', 'Boys', 'Fancy', 'S', 'https://via.placeholder.com/200x250?text=Superman'),
('Princess', 'Kids', 'Girls', 'Fancy', 'M', 'https://via.placeholder.com/200x250?text=Princess'),
('Sherwani', 'Adults', 'Male', 'Ethnic Wear', 'L', 'https://via.placeholder.com/200x250?text=Sherwani'),
('Bridal Saree', 'Adults', 'Female', 'Sarees', 'XL', 'https://via.placeholder.com/200x250?text=Saree');


select * from orders;
truncate table orders;
show tables;
select * from customers;

ALTER TABLE customers RENAME TO users;
-- 1. Add role to users (if not already)
ALTER TABLE users ADD COLUMN role ENUM('seller','customer') NOT NULL DEFAULT 'customer';

-- 2. Add products table (if missing)
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  seller_id INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  age_group VARCHAR(50),
  gender VARCHAR(50),
  type VARCHAR(100),
  size VARCHAR(20),
  price DECIMAL(10,2) DEFAULT 0,
  image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 3. Add orders + order_items (if missing)
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'placed',
  FOREIGN KEY (customer_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  rental_days INT NOT NULL,
  price_at_purchase DECIMAL(10,2) DEFAULT 0,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

ALTER TABLE orders 
  ADD COLUMN status VARCHAR(50) DEFAULT 'placed';
