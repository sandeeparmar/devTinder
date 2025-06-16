const express = require('express') ;
const userauth = require('../middleware/auth'); 

const profileRouter = express.Router() ; 


profileRouter.get("/profile" , userauth ,  async (req ,res) => {
  try{
    const user = req.user ;
    res.send("your profile is " + user) ;
  } 
  catch(err){
    res.status(404).send("please login..." + err.message) ;
  }
}) ;


module.exports = profileRouter ;