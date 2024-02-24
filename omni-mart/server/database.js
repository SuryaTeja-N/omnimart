
/* Complete MongoDB tutorial*/
/*https://www.youtube.com/playlist?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA */

// const { MongoClient } = require("mongodb") // This is when we are using MongoDB directly
const mongoose = require("mongoose") //This is when we are using mongoose framework of mongodb

require('dotenv').config({path:"config.env"})

let dbConnection

// Exporting the DB connection client and connection details realted functions

// "cb" below will be the call back function which we can include when we are calling connectToDb, so that once the called function
// returns a value the call back function gets triggered.
// if error we can also pass it back, so that in call back function we can handle error however we want

module.exports = {
    connectToDb: (cb) => {
        // DB_URI will be mongodb connection string, since this takes time we should
        // use "then" function, which gets called once connection is established and
        // we will get the interface from a field called "client"(if mongodb) "connection"(if mongoose), through this interface
        // we can interact with the connected db 
        // So link should be to the DB that we want to connect to
        // MongoClient.connect(process.env.DB_URI) // This is when we are using MongoDB directly
        mongoose.connect(process.env.DB_URI) //This is when we are using mongoose framework of mongodb
        .then(()=>{
            // dbConnection = client.db() // This is when we are using MongoDB directly
            dbConnection = mongoose.connection; //This is when we are using mongoose framework of mongodb
            return cb()
        })
        .catch(err => {
            console.log(err)
            return cb(err)
        })
    },
    getDb: () => dbConnection
};