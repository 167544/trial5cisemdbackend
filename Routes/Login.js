const express = require('express');
const { getDB} = require('./dbconnection')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const Login = express.Router().post("/", async (req, res) => {
    try {
        const db = getDB();
        const { Username, password } = req.body;
        
        const user = await db.collection("Users").findOne({ Username });
        if (!user) {
            return res.status(400).json({ message: "Invalid User" });
        }
        
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            // Create a JWT token
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Change 'your_secret_key' to your actual secret key
            return res.status(200).json({ message: "Login successful", token  ,user}); // Send token to the client
        } else {
            return res.status(400).json({ message: "Invalid User" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = Login;
