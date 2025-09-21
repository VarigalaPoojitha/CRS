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
