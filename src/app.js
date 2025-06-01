const express = require("express") ;

const app = express() ; // create an express application

/* routing order is important => mtlb ke baad jisse pehle match kar gya usko le jayega browser */

// app.use("/user" , (req,res,next)=>{
//   console.log("inside the route handler ") ;
//   // const data = fs.read("data.txt") ;
//   // if(data > 0)res.send(data) ;
//    next() ;
// } , (req ,res)=> {
//   res.send("This response from route handler 2 ") ;
// });

// app.get( "/get", (req, res) => {
//   res.send("This is from get api call.") ;
// }) ;

// app.post("/post" , (req , res) => {
//   res.send( "This is from post api call ") ;
// }) ;

// app.put("/put" , (req, res) => {
//   res.send("This is from put api call ") ;
// }) ;

function logOriginalUrl (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}

function logMethod (req, res, next) {
  console.log('Request Type:', req.method)
  next()
}

// const logStuff = [logOriginalUrl, logMethod]
app.get("/user/:id/:name/:password",  (req, res, next) => {
  console.log(req.params) ;
  res.send('User Info this is the new thing which you learn') ;
})

app.listen(7777, () => {
  console.log("Hello this is from server side.") ;
}) ;
