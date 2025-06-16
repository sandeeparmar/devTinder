const { Error } = require('mongoose');
const validator = require('validator') ;

const validateSignupData = (req) => {
   const {firstName , lastName , emailID , password} = req.body ; 
   if(!firstName || !lastName){
    throw new Error("Name is not present") ;
   }
   else if(!validator.isEmail(emailID)){
    throw new Errorr ("Email is not valid") ;
   }
   else if(!validator.isStrongPassword(password)){
    throw  new Error("Password is not Strong") ;
   }
} ;
module.exports = validateSignupData ;