const express = require("express")

// Since "app" from connect.cjs is not available here, to access get(),post() and other methods of express if we run below
// code it gives us the instance of the router(i believe "app") so that we can write all the routes here
const router = express.Router()

//To connect to DB and see the response or get the already connected DB instance
const { connectToDb, getDb } = require("../database") 
const db = getDb()

// Get the controllers
const {signUpUser,signInUser,getUsers} = require("../controllers/userDetailsController")

router.get("/getUsers", getUsers)

router.post("/signUpUser", signUpUser)

router.post("/signInUser",signInUser)

// Exports the router so that it is accessible everywhere
module.exports = router