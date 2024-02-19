let express = require('express');
let mongodb = require('mongodb')
let client = mongodb.MongoClient;

let InsertData = express.Router().post("/",(req,res)=>{
    client.connect("mongodb://localhost:27017/employee",(err,db)=>{
        if(err){
            throw err
        }else{
           db.collection("employeeDetails").insertMany(req.body,(err,result)=>{
            if(err){
                throw err
            }else{
                res.send(result)
            }
           })
        }
    })

})

module.exports = InsertData;