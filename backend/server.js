const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blood_connect',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
app.get('/api/test', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    res.json({ message: 'Database connection successful' });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

// API Routes
// Get all donors
app.get('/api/donors', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM donors');
    res.json({ success: true, donors: rows });
  } catch (error) {
    console.error('Error fetching donors:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch donors' });
  }
});

// Get donor by ID
app.get('/api/donors/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM donors WHERE id = ?', [req.params.id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Donor not found' });
    }
    
    res.json({ success: true, donor: rows[0] });
  } catch (error) {
    console.error('Error fetching donor:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch donor' });
  }
});

// Create new donor
app.post('/api/donors', async (req, res) => {
  try {
    const donor = req.body;
    
    const [result] = await pool.query(
      `INSERT INTO donors (
        firstName, lastName, email, phone, bloodType, age, weight, 
        lastDonation, address, city, state, zipCode, medicalConditions, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        donor.firstName, donor.lastName, donor.email, donor.phone, 
        donor.bloodType, donor.age, donor.weight, donor.lastDonation,
        donor.address, donor.city, donor.state, donor.zipCode,
        donor.medicalConditions, donor.status || 'active'
      ]
    );
    
    res.status(201).json({ 
      success: true, 
      id: result.insertId.toString(),
      message: 'Donor created successfully' 
    });
  } catch (error) {
    console.error('Error creating donor:', error);
    res.status(500).json({ success: false, error: 'Failed to create donor' });
  }
});

// Update donor
app.put('/api/donors/:id', async (req, res) => {
  try {
    const donor = req.body;
    const donorId = req.params.id;
    
    const [result] = await pool.query(
      `UPDATE donors SET
        firstName = ?, lastName = ?, email = ?, phone = ?, bloodType = ?,
        age = ?, weight = ?, lastDonation = ?, address = ?, city = ?,
        state = ?, zipCode = ?, medicalConditions = ?, status = ?
      WHERE id = ?`,
      [
        donor.firstName, donor.lastName, donor.email, donor.phone, 
        donor.bloodType, donor.age, donor.weight, donor.lastDonation,
        donor.address, donor.city, donor.state, donor.zipCode,
        donor.medicalConditions, donor.status, donorId
      ]
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Donor not found' });
    }
    
    res.json({ success: true, message: 'Donor updated successfully' });
  } catch (error) {
    console.error('Error updating donor:', error);
    res.status(500).json({ success: false, error: 'Failed to update donor' });
  }
});

// Delete donor
app.delete('/api/donors/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM donors WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, error: 'Donor not found' });
    }
    
    res.json({ success: true, message: 'Donor deleted successfully' });
  } catch (error) {
    console.error('Error deleting donor:', error);
    res.status(500).json({ success: false, error: 'Failed to delete donor' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 