const express = require('express');
const { getDB } = require('./dbconnection');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db = getDB(); // Assuming you have a function to get the database connection
    const collection = db.collection('employeeDetails'); // Assuming your collection is named 'employees'
    
    const newEmployee = req.body; // Assuming the request body contains the data for the new employee
    
    // Insert the new employee into the database
    const result = await collection.insertOne(newEmployee);

    if (result.insertedCount === 1) {
      res.status(201).json({ message: 'Employee inserted successfully' });
    } else {
      res.status(500).json({ error: 'Failed to insert employee' });
    }
  } catch (error) {
    console.error('Error inserting employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
