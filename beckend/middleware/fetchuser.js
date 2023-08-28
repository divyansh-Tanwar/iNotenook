var jwt = require('jsonwebtoken');
//put this in .env file
const JWT_SECRET="iamdivyanshthegod";

const fetchuser=function(req,res,next)
{
   const token=req.header("auth-token");
   if(!token)
   {
    res.status(401).send({error:"please authenticate using valid token"});
   }
   try{
    const data=jwt.verify(token,JWT_SECRET);
    req.user=data.user;
    next(); //this will call the next function after this middle ware is executed
   }catch{
    res.status(401).send({error:"please authenticate using valid token"});
   }
}

module.exports=fetchuser;