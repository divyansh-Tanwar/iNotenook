const express=require("express");
const router=express.Router();

router.get('/',function(req,res){

    res.send("auth is you");
});

module.exports=router;