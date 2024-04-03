const express = require('express');
const { getDB, getCollection} = require('./dbconnection')


const PrimarySkills = express.Router().get("/:skillName", async (req, res) => {
    try {
        const { skillName } = req.params;
        console.log(skillName);

        const collection = getCollection()
        const result = await collection.find({
            "Primary Skill": { $regex: new RegExp("\\b" + skillName + "\\b", "i") }
        }).toArray();

        res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = PrimarySkills;
