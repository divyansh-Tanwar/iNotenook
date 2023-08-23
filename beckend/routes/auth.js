const express=require("express");
const router=express.Router();
const User=require("../models_mongoose/User");
router.post('/',function(req,res){
    
    console.log(req.body);
    const user=User(req.body);
    user.save();
    res.send(req.body);

});

module.exports=router;