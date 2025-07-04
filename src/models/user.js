const mongoose = require("mongoose") ;
const validator = require('validator');
const bcrypt = require('bcrypt') ;
const jwt = require('jsonwebtoken') ;

const userSchema = mongoose.Schema({
   firstName : {
     type : String ,
     required : true ,
     trim : true ,
     minLength :3 ,
     maxLength :14 , 
     validate: {
       validator(value) {
        return validator.isAlpha(value, 'en-US', { ignore: ' ' });
       },
      message: "First Name should only contain letters and spaces."
    }
   } ,
   lastName:{
    type : String ,
    trim : true ,
    minLength : 3 ,
    maxLength :14 ,
    uppercase : true,
    validate: {
       validator(value) {
        return validator.isAlpha(value, 'en-US', { ignore: ' ' });
       },
      message: "Last Name should only contain letters and spaces."
    } 
   },
   age:{
    type : Number ,
    min : 18 , 
    max : 100 ,
   } ,
   emailID:{
    type : String  ,
    required : true ,
    unique : true ,
    trim : true ,
    // match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    validate: {
        validator(value){
           return validator.isEmail(value)  ;
        },
        message : "Email is not in valid form"
    } 
   },
   password:{
     type : String ,
     trim : true  ,
     required : true ,
     index : true ,
   },
   gender:{
    type : String ,
    lowercase : true ,
    index : true  ,
    validator(value){
      if(!["male" , "female" , "other"].includes(value)){
        throw new Error("Gender Data is Not valid") ;
      }
    }
   },
   phone:{
    type : String ,
    index  :true ,
    trim : true ,
    uppercase : true ,
    maxLength : 10 , 
    minLength :10 ,
     match: [/^[6-9]\d{9}$/, 'Invalid Indian mobile number']
   },
   about:{
    type : String ,
    index : true ,
    default : "I am Software developer" ,
    maxLength : 100 ,
   } ,
   photoUrl : {
    type : String ,
    index : true ,  
    default : "https://media.licdn.com/dms/image/v2/D5603AQHIfL47sJeHmQ/profile-displayphoto-shrink_800_800/B56Za.fkayHUAc-/0/1746952671643?e=1756944000&v=beta&t=2Aohsxr-7zg9o4k4rS59GOwyxesE_dwXTspz5t_R2mY",
    maxLength : 100000 ,
   } ,
   skills : {
     type : Array ,
     default :["JavaScript" , "C++" , "C"  , "Mern Stack"] ,
   }
} ,{
  timestamps : true ,
});

userSchema.methods.userToken = async function() {
   const user = this ;
   const token = await  jwt.sign({_id : user._id} , process.env.JWT_SECRET, {expiresIn: '7d'}) ;
  return token ;
} ;

userSchema.methods.validatePassword = async function(UserPassword){
  const user = this  ;
  const userHashPassword = user.password ;
  const validate = await bcrypt.compare(UserPassword , userHashPassword) ;
  return validate ;
} ;

const UserModel = mongoose.model("User" , userSchema) ;

module.exports = UserModel ;
