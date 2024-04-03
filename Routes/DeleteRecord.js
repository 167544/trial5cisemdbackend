const express = require('express');
const { getCollection } = require('./dbconnection');

const deleteRecord = express.Router().delete("/:id", async (req, res) => {
    try {
        const collection = getCollection();
        const result = await collection.deleteOne({"Employee ID" : parseInt(req.params.id)});
        console.log("deleted")
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = deleteRecord;
