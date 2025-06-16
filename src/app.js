const express = require("express") ;
const app = express() ; 
const connectDB = require("./config/database") ;
require("dotenv").config() ;
const cookieParser = require('cookie-parser') ;

app.use(express.json()) ;
app.use(cookieParser()) ;

const authRouter = require('./router/author.js') ;
const profileRouter  = require('./router/profile.js') ;
const requestRouter = require('./router/request.js') ;



app.use("/" , authRouter) ;
app.use("/" , profileRouter) ;
app.use("/" , requestRouter) ;


connectDB()
   .then(() => {
    console.log("Database is Connected Successfully") ;
    
    app.listen(process.env.PORT , () => {
      console.log("Hello this is from server side.") ;
    }) ;
   })
   .catch((err) =>  {
      console.error("Database is not connected " , err.message);
   }) ; 

