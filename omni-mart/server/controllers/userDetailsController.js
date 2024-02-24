// To save all the functions that are to be used inside routes
// Just a better way of modularization

const userModel = require("../models/userDetailsModel")

// Signup new user
const signUpUser = async (req,res)=>{
    const {email,password} = req.body

    try{
        //calling static method created in model over here
        const user = await userModel.signup(email,password)
        res.status(200).json({email,user})
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

const getUsers = async (req,res)=>{
    const users = await userModel.find({})
    res.status(200).json(users)
}

const signInUser = async (req,res)=>{
    res.json({mssg:'login user'})
}

module.exports = {signUpUser,signInUser,getUsers}
