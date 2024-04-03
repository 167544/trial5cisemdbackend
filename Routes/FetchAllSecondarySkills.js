let express = require('express');



const { getDB, getCollection} = require('./dbconnection')

let getSecondarySkills = express.Router().get('/',async(req,res)=>{
    try{
       let collection =  getCollection()
       let skills = await collection.distinct("Secondary Skill");
     
       res.send(skills)

    }catch(err){
        res.send(err)
    }

})
export default getSecondarySkills;