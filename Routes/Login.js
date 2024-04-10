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
        var userType = typeof user.name;
        if (result) {
            let employeeID = parseInt(user.name); 
            let employeeName;

            console.log('User Name:', employeeID); // Log the user name for debugging

            
            const employee = await db.collection("employeeDetails").findOne(
                { "Employee ID": employeeID }
            );
            console.log('Employee:', employee); // Log the employee details for debugging
            
            if (employee) {
                employeeName = employee['Employee Name'];
            } else {
                if(userType == 'string'){
                    employeeID=user.name
                }
                const manager = await db.collection("employeeDetails").findOne(
                    { "Manager ID": employeeID }
                );
                console.log('Manager:', manager); // Log the manager details for debugging
                
                if (manager) {
                    employeeName = manager['Manager Name'];
                }
            }
    
            if (!employeeName) {
                return res.status(400).json({ message: "Employee details not found" });
            }
            
            // Create a JWT token
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' }); // Change 'your_secret_key' to your actual secret key
            const response = {
                message: "Login successful",
                token,
                user: {
                    _id: user._id,
                    name: employeeName,
                    username: user.Username,
                    userRole: user.userRole
                }
            };
    
            return res.status(200).json(response);
        } else {
            return res.status(400).json({ message: "Invalid User" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = Login;