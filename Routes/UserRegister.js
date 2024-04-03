const express = require('express');
const { getDB} = require('./dbconnection')

const bcrypt = require('bcrypt');


const Register = express.Router().post("/", async (req, res) => {
    try {
        const db = getDB()
        const { name, Username, password, repeatPassword, userRole } = req.body;

        // Check if a user with the same name or username already exists
        const existingUser = await db.collection("Users").findOne({ $or: [ { Username }] });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }

        // Check if password and repeatPassword match
        if (password !== repeatPassword) {
            return res.status(400).send("Passwords do not match");
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            name,
            Username,
            password: hashedPassword,
            userRole
        };

        // Insert the new user into the database
        await db.collection("Users").insertOne(newUser);
        res.json({ message: "User registered successfully" });
    } catch (err) {
        console.error("Error registering user:", err);
        res.status(500).send("An error occurred during registration. Please try again later.");
    }
});

module.exports = Register;
