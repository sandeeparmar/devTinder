const express = require('express') ;
const userauth = require('../middleware/auth'); 

const requestRouter = express.Router() ; 

requestRouter.post('/sendConnectionRequest' ,userauth ,  (req ,res) => {
   
  const user = req.user  ;
  res.send("sent Connection Successfully") ;

}) ;


module.export = requestRouter ;
