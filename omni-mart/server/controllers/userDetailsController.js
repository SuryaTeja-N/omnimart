// To save all the functions that are to be used inside routes
// Just a better way of modularization

const userModel = require("../models/userDetailsModel")

// module or function that can be used to generate jsonwebtoken, so that once user is authenticated
// and login, then we can create a JWT(jsonwebtoken) and pass it back to frontend. Whenever frontend
// needs to communicate back for the same user it shares the JWT which will be decrypted and checked
// to see if it is not tampered, if not tampered then backend access will be provided
// use "npm install jsonwebtoken" to install this module
const jwt = require("jsonwebtoken")

// Common function to create JWT
const createToken = (_id)=>{
    // firt argument in "sign" should be an object, like a payload for which token is created

    //second argument will be a secret string which will be known only to the server. This will be used
    // to sign the JWT. When server receives a JWT, once it is decripted, the decripted value will be
    // compared with the secret string, only if the value matches, then JWT is not tampered with. So this
    // secret string can be anything, but it should be known only to the server. So put it in .env so that it
    // does not go to github

    // third argument will be options, for example till when should the JWT be valid or when should it expire
    return jwt.sign({_id},process.env.SECRET,{ expiresIn: "3d"})
}

// Signup new user
const signUpUser = async (req,res)=>{
    const {email,password} = req.body

    try{
        //calling static method created in model over here
        const user = await userModel.signup(email,password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email,token})
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
    const {email,password} = req.body

    try{
        //calling static method created in model over here
        const user = await userModel.signin(email,password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email,token})
    }
    catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signUpUser,signInUser,getUsers}
