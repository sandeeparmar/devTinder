const express = require("express") ;

const app = express() ; // create an express application

app.use( "/sandeepParmar", (req , res)=>{
  res.send("This is from sandeep Parmar  function ") ;
}) ;

app.use( "/username", (req , res)=>{
  res.send("This is from username function ") ;
}) ;

app.use( "/hello" , (req , res) =>  {
  res.send("This is from hello url function") ;
}) ;

app.use("/data" ,  (req , res) =>  {
  res.send("This is from data url  function") ;
}) ;

app.use((req , res) =>  {
  res.send("This is from app.use function") ;
}) ;

app.listen(7777, () => {
  console.log("Hello this is from server side.") ;
}) ;
