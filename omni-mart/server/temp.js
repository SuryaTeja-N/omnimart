
/*In package.json which is a file that got generated when added manually to tell the system that, if I have already started the server once then connect.cjs which has code to run/start 
the server should get restarted whenever I save the code*/
const express = require("express");
const app = express(); //this "app" can be used for applying middlewares, telling API to start, creating routes
const mongoose = require("mongoose"); //Mongoose is used to easily access mongodb and perform functions in mongodb
const userModel = require("./models/userDetails");
const router = express.Router();

// to parse json to object, since any request that involves body will be giving body in json format and that needs to be
// converted to object. You can see the "create" request below
app.use(express.json())

// require("dotenv").config({path: "./config.env"})
mongoose.connect("mongodb://127.0.0.1:27017/OmniCart");//process.env.DB_URI)

app.listen(3000, () => {
    console.log("Server is running successfully!")
})

// APIs
// We can use routers as well, can further study that later
// req - request -> getting from front end
// res - response -> sending back to front end
app.get("/getUsers", async (req,res)=>{
    // router.get("/getUsers", async (req,res)=>{
    userModel.find({},(err,result) => {
        if(err){
            res.json(err)
        }   else {
            res.json(result)
        }
    })
})
// })

// app.post("/createUser", async (req,res) => {
//     // Since body generally comes as part of request which will be in the requried json format
//     const user = req.body;
//     // using the user model and the received body we can create data to be filled
//     const newUser = new userModel(user);
    
//     await newUser.save();
//     res.json(user);
// });

app.post("/createUser", async (req,res) => {
// router.post("/createUser", async (req,res,next) => {
    // Since body generally comes as part of request which will be in the requried json format
    const user = req.body;
    // using the user model and the received body we can create data to be filled
    const newUser = new userModel(user);
    
    await newUser.save();
    res.json(user);
});
// });


module.exports = router;