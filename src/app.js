const express = require("express") ;
const app = express() ; 
const connectDB = require("./config/database") ;
const User = require("./models/user.js") ;
const validateSignupData = require("./util/validate.js");
const validator = require('validator') ;
const bcrypt =  require('bcrypt') ;
const cookieParser = require('cookie-parser') ;
const jwt = require('jsonwebtoken') ;
const userauth = require("./middleware/auth.js") ;
app.use(cookieParser()) ; 
app.use(express.json()) ; 
require("dotenv").config() ;


app.post("/signup" , async (req ,res)=>{
  try{
    validateSignupData(req) ; // checking 
    const {firstName , lastName , emailID , password} = req.body ;
    const passwordHash  =  await bcrypt.hash(password , 10) ;
    const user = new User({
       firstName , lastName , emailID , password : passwordHash,
    }) ;  
    await user.save() ; // return a promise
    res.send("data is saved successfully \n" + user) ;
  }
  catch(err){
    res.send("Something went Wrong... " + err
    ) ;
  }
});


app.post("/user/login" , async (req,res) => {
  try{ 
    const {emailID , password}  = req.body ;
    const user = await User.findOne({emailID : emailID}) ;
    if(!user) {
      throw new Error("Email is not present ") ;
    } 
    const userHashPassword = user.password ;
    const isPasswordValid = await user.validatePassword(password) ;
    if(!isPasswordValid){
      throw new Error("Password is wrong ") ;
    }
    else {
      const token = await user.userToken() ;
      res.cookie("token" , token ,{ expires: new Date(Date.now() + 900000)});
      res.send("Login Successfully") ;
    }
  } 
  catch(err){
    res.status(401).send("Something went wrong " + err.message) ;
  } 
}) ;


app.get("/profile" , userauth ,  async (req ,res) => {
  try{
    const user = req.user ;
    res.send("your profile is " + user) ;
  } 
  catch(err){
    res.status(404).send("please login..." + err.message) ;
  }
}) ;





//update the data
app.patch("/user/:userId" , userauth , async(req, res) => {
 const data = req.body; 
 const user_id= req.params?.userId;

  try{   
    
    const updateAllowedOnly = ["age" , "password" , "gender" , "phone"] ;

    const allowed = Object.keys(data).every((k) => updateAllowedOnly.includes(k));

    if(!allowed){
      res.status(400).send("Update is not allowed  on some fields") ;
    }


    const user = await User.findOneAndUpdate({_id : user_id} , 
      {$set :  data} , 
      {returnDocument : "after" ,
        runValidators : true ,
      }
    ) ;
    res.send( (user)) ;
  }   
  catch (err){
    res.status(401).send("Something went wrong" + err) ;
  }
}) ;

// delete the data
app.delete("/user" , userauth , async (req ,res) => {
  try{
      const user_id = req.user.userId ;
      const users = await User.findByIdAndDelete(user_id); 
      res.send("User Deleted Successfully" + users) ;
    }
    catch(err){
      req.status(401).send("Something went Wrong") ;
    }
}) ;

//for only one user 
app.get("/user" ,userauth ,async (req ,res , next) => {
  const userEmail = req.body.emailID ;
  try{
    const users = await User.find({emailID : userEmail}) ; // return a collection of users in the for of array 
    if(users.length === 0) {
      res.status(404).send("User Not Found") ;
    }
    else {
      res.send(users) ;
    }
  }
  catch(err) {
    res.status(400).send("Something Went Wrong") ;
  }
});

// feed api  get/api all the user from the database 
app.get("/feed" , async (req ,res)  => {
  try{
    const users = await User.find({})  ; // when this is empty means returning all document which is present inside the db
    if(users.length === 0){
      res.status(401).send("Not a Single User Present") ;
    } 
    else {  
      res.send(users) ;
    }
  }
  catch(err) {
    res.status(401).send("Something Went Wrong") ;
  }
});



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

