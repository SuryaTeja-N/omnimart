
// This is server related code
/*Use below link to understand node.js*/
/* https://www.youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp */

/* Complete MongoDB tutorial*/
/*https://www.youtube.com/playlist?list=PL4cUxeGkcC9h77dJ-QJlwGlZlTd4ecZOA */

/* MERN Stack tutorial */
/* https://www.youtube.com/playlist?list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE */

/* Asynchronus JAVASCRIPT, CALLBAL,CALLBACK HELL, PROMISES, ASYNC-AWAIT */
/* https://www.youtube.com/playlist?list=PL4cUxeGkcC9jx2TTZk3IGWKSbtugYdrlu */

/* MERN Authentication Login/SignUp/Password Hashing/JSON Web Tokens
/* https://www.youtube.com/playlist?list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT */

/*"npm install dotenv" here dotenv is a package this helps us to access the variables which are created inside .env files 
through "process.env object" which will be available globaly in nodejs */
/* reason behind using dotenv is, when we push our code to github, .env files will not be pushed keeping sensitive information
secure. Generally .env files are included in .gitignore, if not already included, include them so that git ignores them and 
not import them  */
// Below code or method attaches the environment variables to process.env
require('dotenv').config({path:"config.env"})

/*In package.json which is a file that got generated when node is initialized using npm init.
We can add manually "nodeman file.js" to tell the system that, if I have already started the 
server once then file.js which has code to run/start the server should get restarted whenever I save the code*/

// Getting routers for specific collections created in a different file here so that we can invoke
const userDetailsRoutes = require("./routes/userDetailsRoutes")

//Express App
const express = require("express");
const app = express(); //this "app" can be used for applying middlewares, telling API to start, creating routes

//middleware that is used to parse incoming requests with JSON payloads. When a POST request is made with 
// a JSON body, this middleware will parse the JSON and make it available in req.body of the route handlers.
app.use(express.json()) //This helps even if the routes are in other files

const { connectToDb, getDb } = require("./database") //To connect to DB and see the response

// start of connecting frontend to backend
/*// The app.use(cors()) function in a Node.js application using Express is used to enable Cross-Origin Resource Sharing (CORS) 
for the server. CORS is a security feature implemented by browsers that restricts cross-origin HTTP requests. When you 
use app.use(cors()), it allows your server to respond to requests from different origins, enabling cross-origin requests.*/
const cors = require('cors')
app.use(cors());
//end of connecting frontend to backend

/*Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and 
mobile applications. It is commonly used to build the backend of web applications, allowing developers to define routes, 
handle HTTP requests, and set up middleware to process incoming requests. Express simplifies the process of building 
web servers and APIs in Node.js, making it a popular choice for backend development. It provides a wide range of features 
and tools for handling various aspects of web application development, such as routing, request processing, and 
middleware integration.*/

//DB connection and listening to port
let db
connectToDb((err) => {
    if (!err){
        app.listen(process.env.PORT, () => {
            console.log("Server is listening to port 3000 successfully!")
        })
        db = getDb()
    }
})

//middleware
//This get's triggered for all the requests, from here we can navigate to the request like get or post using "next"
// based on the received request. This is to keep everything logged for us to check if something goes wrong
app.use((req, res, next)=>{
    console.log(req.path,req.method)
    next()
})

// Routes(After the below code, Refer below commented code and comments to understand difference between 
// having a separate file for routers or having same file for routers)
// This code attaches all the routes in userDetailsRoutes to main app, so that based on the URL extensions the required
// router method is invoked. We can even give starting URL like app.use("/userDetails",userDetailsRoutes). What happens
// is, only if the incoming URL is http:localhost:3000/userDetails/"whatever" then only "whatever" gets triggered inside
// userDetailsRoutes. If the URL is http:localhost:3000/"whatever" then "whatever" does not get trigerred
app.use(userDetailsRoutes)

// APIs
// req - request -> getting from front end
// res - response -> sending back to front end

//find() of db.collection() actually just gives the cursor, on this if we use toArray it processes all the documents
// and if we use forEach it processes document one by one and allows us to work on it.
// In both cases it fetches data in bacthes(default is probably around 101), so that the network bandwidth
// used is less. So fetching is in batches and processing is based on the called function. PFB syntax
// "/getUsers" will be the url extension needed to trigger this piece of code

//Routes
// Below is kept commented here just to give an idea that we can have APIs/Routes directly here
// Just for modularization we can move everything related to routes in one file and use "router" provided by express to invoke
// them from here

// app.get("/getUsers", (req,res)=>{
//     let users = []
//     db.collection("userDetails")
//     .find()
//     .forEach(user => users.push(user))
//     .then(()=>{
//         res.status(200).json(users)
//     })
//     .catch(()=>{
//         res.status(500).json({error:"Could not fetch the documents"})
//     }) 
// })

// app.use(express.json()) used above would have parsed the request received and put the data in req.body. Here we should
// just pass it to insert. "/signup" will be the URL extension needed to trigger this piece of code
// Below is kept commented here just to give an idea that we can have APIs/Routes directly here
// Just for modularization we can move everything related to routes in one file and use "router" provided by express to invoke
// them from here
// app.post("/signUp",(req,res)=>{
//     const userDetails = req.body

//     db.collection("userDetails")
//     .insertOne(userDetails)
//     .then(result => {
//         res.status(201).json(result)
//     })
//     .catch(err=>{
//         res.status(500).json({err:"Could not create the document"})
//     })
// })