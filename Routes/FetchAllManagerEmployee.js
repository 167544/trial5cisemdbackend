const express = require('express');


const { getDB, getCollection} = require('./dbconnection')

const FetchAllManagerEmployee = express.Router().get("/:boxname", async (req, res) => {
    try {
        const { boxname } = req.params;
        const box = boxname.toString();
        console.log(boxname);

        const collection = getCollection();
        const result = await collection.find({
            $or: [
                {"1st Manager": box},
                {"2nd Manager": box},
                {"3rd Manager": box},
                {"Manager Name": box},
                {"Project Manager Name": box}
            ]
        }).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = FetchAllManagerEmployee;
