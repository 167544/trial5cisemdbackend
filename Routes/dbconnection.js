const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
let _collection;

const connectDB = async () => {
    try {
        const client = await MongoClient.connect("mongodb://localhost:27017");
        _db = client.db("employee");
        _collection = _db.collection("employeeDetails");
        console.log("Connected to the database");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw error;
    }
};

const getDB = () => {
    if (!_db) {
        throw "No database connection established!";
    }
    return _db;
};

const getCollection = () => {
    if (!_collection) {
        throw "No collection available!";
    }
    return _collection;
};

module.exports = {
    connectDB,
    getDB,
    getCollection,
};
