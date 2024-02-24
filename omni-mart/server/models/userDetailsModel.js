// Mongodb alone is not structure, mongoose helps in coming up with schema and structure
const mongoose = require("mongoose")

// module or function that can be used to perform hashing of the passwords
// use "npm install bcrypt" to install this module
const bcrypt = require("bcrypt")

//module or function that can be used to validate if email is valid and password is strong
// use "npm install validator" to install this module
const validator = require("validator")

// Need to provide the structure or schema of the document of a collection
// After this, using the schema a model will be created
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required:true,
    }
});

// Static method for signup
// Anywhere "this" is used, it is referring to the usermodel
// We cannot use arrow function if we are using "this", we need to use regular function
userSchema.statics.signup = async function(email,password){

    //validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid")
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }

    const exists = await this.findOne({email})
    if (exists){
        throw Error('Email already in use')
    }

    //salt is random set of characters that can be added to our passwords so that the hash will be totally different
    // incase two users are using same password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email,password:hash})

    return user

}

//Static method for signin
// Anywhere "this" is used, it is referring to the usermodel
// We cannot use arrow function if we are using "this", we need to use regular function

userSchema.statics.signin = async function(email,password){
    //validation
    if(!email || !password){
        throw Error("All fields must be filled")
    }

    const user = await this.findOne({email})
    if (!user){
        throw Error('Incorrect email')
    }

    // this compares the normal text password user has provided right now with the hashed password
    // fetched from DB. Internally it performs the encryption and decryption and performs the validation
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect credentials")
    }

    return user
}


// First argument will be singular name of the collection your model is for. Mongoose automatically looks for the plural, lowercased version of your model name and 

// second value will be the schema name created above
// If we did not have the collection with this name, then it will create a collection in DB when first document is saved, if 
// already exists then it will not be created again.

// Third argument is override for collection name. In our case itself, we can see our collection name is "userDetails", if we give this in our first argument, it tries to
// look at "userdetailss" since it looks for lower case plural form to whatever we give in first argument. So it fails to find that collection. Instead here we can give the
// actual collection name in last argument and it searches for that directly
const userModel = mongoose.model("userDetails",userSchema,"userDetails")

// So that we can export this model and we will be able access this model and perform changes to our table/collection 
// throughout our application
module.exports = userModel
