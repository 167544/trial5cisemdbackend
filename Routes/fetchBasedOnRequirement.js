const express = require('express');
const { getDB, getCollection} = require('./dbconnection')

const fetchbasedOnCondition = express.Router().get("/:boxname", async (req, res) => {
    try {
        const { boxname } = req.params;
        const box = boxname.toString();
        console.log(boxname);

        const collection = getCollection();
        
        let query = {};
        query[box] = { $exists: true }; // Constructing the query object dynamically
        
        let result;

        if (box == "Total Employees") {
            result = await collection.find().toArray();
        } else if (box == "Total Customers") {
            result = await collection.find({ "Customer ID": { $exists: true }}).toArray();
        } else if (box == "selectedlist") {
            result = await collection.find({ "shortlisted": true}).toArray();
        } else if (box == "removedlist") {
            result = await collection.find({ "shortlisted": false}).toArray();
        } else {
            result = await collection.find(query).toArray();
        }

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = fetchbasedOnCondition;
