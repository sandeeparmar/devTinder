const { compare } = require("bcrypt");
const mongoose = require("mongoose") ;
const User = require("./user.js") ;

const connectionRequestSchema = new mongoose.Schema({
  fromUserId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User' ,
    required : true  ,
  } ,
  toUserId : {
    type : mongoose.Schema.Types.ObjectId ,
    ref : 'User' ,
    required : true  ,
   } ,
  status : {
    type : String , 
    required : true,
    enum : {
      values : ["ignored" ,"interested" , "accepted" , "rejected"] ,
      message :`{VALUE} is incorrect status type` ,
    },
  } ,
} , 
{
  timestamps : true 
}
);

connectionRequestSchema.index({fromUserId : 1 , toUserId : 1}) ; // compunding indexing 

connectionRequestSchema.pre("save" , function(next)  {
  const connectionRequest = this ;
  if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
    throw new Error("Cannot send Connection request to yourself") ;
  }
  next() ;
}); 

const connectionRequestSchemaModel = new mongoose.model("connectionRequest" , connectionRequestSchema) ;

module.exports = connectionRequestSchemaModel ;
