let express = require('express');

const { getDB, getCollection} = require('./dbconnection')

let getPrimarySkills = express.Router().get('/', async (req, res) => {
    try {
        let collection= getCollection()
        let skills = await collection.distinct("Primary Skill");

        // Split each skill string by comma, then flatten the resulting arrays
        let uniqueSkills = skills.flatMap(skill => skill.split(','));

        // Filter out empty strings and trim each skill
        uniqueSkills = uniqueSkills.filter(skill => skill.trim() !== '');

        res.send(uniqueSkills);
    } catch (err) {
        res.send(err);
    }
});

module.exports = getPrimarySkills;