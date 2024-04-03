const express = require('express');
const { getCollection } = require('./dbconnection');

const InsertOrUpdateData = express.Router().post("/", async (req, res) => {
    try {
        const collection = getCollection();
        const records = req.body; // Assuming req.body contains an array of records

        // Iterate over each record in the request body
        for (const record of records) {
            const { "Employee ID": employeeID } = record;

            // Check if a record with the same Employee ID already exists in the database
            const existingRecord = await collection.findOne({ "Employee ID": employeeID });

            if (existingRecord) {
                // If the record exists, update it
                await collection.updateOne({ "Employee ID": employeeID }, { $set: record });
                console.log("Record updated:", record);
            } else {
                // If the record doesn't exist, insert a new record
                await collection.insertOne(record);
                console.log("Record inserted:", record);
            }
        }

        res.status(200).send("Data inserted/updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = InsertOrUpdateData;
