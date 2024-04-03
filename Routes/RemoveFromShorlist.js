const express = require('express');
const { getDB, getCollection} = require('./dbconnection')


const removefromshorlist = express.Router().put('/:id', async (req, res) => {
    try {
        const collection = getCollection()
        const result = await collection.updateOne(
            {"Employee ID": parseInt(req.params.id)},
            {$set: {shortlisted: false}}
        );
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = removefromshorlist;
