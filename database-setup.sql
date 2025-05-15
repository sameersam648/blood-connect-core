-- Create database
CREATE DATABASE IF NOT EXISTS blood_connect;
USE blood_connect;

-- Create donors table
CREATE TABLE IF NOT EXISTS donors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  bloodType VARCHAR(5) NOT NULL,
  age VARCHAR(5) NOT NULL,
  weight VARCHAR(5) NOT NULL,
  lastDonation DATE,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(100),
  zipCode VARCHAR(20),
  medicalConditions TEXT,
  status ENUM('active', 'inactive') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO donors (firstName, lastName, email, phone, bloodType, age, weight, lastDonation, address, city, state, zipCode, medicalConditions, status)
VALUES 
  ('John', 'Doe', 'john.doe@example.com', '(555) 123-4567', 'O+', '28', '75', '2023-04-15', '123 Main St', 'Springfield', 'IL', '62701', '', 'active'),
  ('Jane', 'Smith', 'jane.smith@example.com', '(555) 987-6543', 'A-', '34', '62', '2023-03-22', '456 Oak Ave', 'Riverdale', 'NY', '10471', 'Low blood pressure', 'active'),
  ('Robert', 'Johnson', 'robert.johnson@example.com', '(555) 456-7890', 'B+', '42', '80', '2023-05-01', '789 Pine Rd', 'Oakville', 'CA', '94563', '', 'inactive'),
  ('Emily', 'Davis', 'emily.davis@example.com', '(555) 234-5678', 'AB+', '25', '58', '2023-01-10', '321 Cedar Ln', 'Lakeview', 'WA', '98033', '', 'active'); 