let express = require('express');
const { getDB, getCollection} = require('./dbconnection')

let getallmangers = express.Router().get('/',async(req,res)=>{
    try{
       let collection = getCollection()
       let Managers1st = await collection.distinct("1st Manager");
       let Managers2nd = await collection.distinct("2nd Manager");
       let Managers3rd = await collection.distinct("3rd Manager");
       let ManagerName = await collection.distinct("Manager Name");
       let allManagers =  [...Managers1st,...Managers2nd,...Managers3rd,...ManagerName]
       let Managers = [...new Set(allManagers)]


       res.send(Managers)

    }catch(err){
        res.send(err)
    }

})
module.exports = getallmangers