const express = require('express');
const { getCollection } = require('./dbconnection');

const fetch = express.Router().get("/:id", async (req, res) => {
    try {
        const collection = getCollection();
        const result = await collection.find({"Employee ID" : parseInt(req.params.id)}).toArray();
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = fetch;
