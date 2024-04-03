const express = require('express');
const { getCollection } = require('./dbconnection');

const Addtoshortlist = express.Router().put('/:id', async (req, res) => {
    try {
        const collection = getCollection();
        const result = await collection.updateOne(
            {"Employee ID": parseInt(req.params.id)},
            {$set: {shortlisted: true}}
        );
        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = Addtoshortlist;
