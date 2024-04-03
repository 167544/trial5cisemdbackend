let express = require('express');
const { getDB, getCollection} = require('./dbconnection')
let getLocationCounts = express.Router().get('/:nameofColumn', async (req, res) => {
    try {
        let collection = getCollection()
        let columnName = req.params.nameofColumn; // Extract the parameter from the URL
        let result = await collection.aggregate([
            {
                $group: {
                    _id: `$${columnName}`,
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: {
                        $cond: { if: { $eq: ["$_id", null] }, then: "Unknown", else: "$_id" }
                    },
                    count: 1
                }
            }
        ]).toArray();

        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

module.exports = getLocationCounts;