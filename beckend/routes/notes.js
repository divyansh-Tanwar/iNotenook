const express=require("express");
const router=express.Router();

router.get('/',function(req,res){

    res.send("notes is you");
});

module.exports=router;