const express = require("express");
const router = express.Router();
const User = require("../models_mongoose/User");
//expess validation(for validation check(data entered by user is correct or not))
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
//put this in .env file
const JWT_SECRET="iamdivyanshthegod";
router.post('/',
    body('name', 'Enter a Valid name').isLength({ min: 5 }),
    body('Email', 'Enter a valid Email').isEmail(),
    body('password', 'Entre a Valid password').isLength({ min: 8 }),
    function (req, res) {
        //this will give wheather validation is successfull or not and store that in result
        console.log(req.body);
        const result = validationResult(req);
        console.log(result);
        //hashing a password
        const pass = req.body.password;
        if (result.isEmpty()) {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(pass, salt, function (err, hash) {
                    // Store hash in your password DB.
                    const user = new User({
                        name: req.body.name,
                        Email: req.body.Email,
                        password: hash
                    });
                    user.save().then(function (r, s) {
                        console.log("saved successfully");
                         const data={
                            user:{
                                id:user.id
                            }
                         };
                        var token = jwt.sign(data,JWT_SECRET);
                        res.status(200).send("token="+token);
                    }).catch(function (error) {
                        console.log("Invalid entry");
                        res.status(400).send(error);
                    })
                });
            });

        }
        else {
            res.status(400).send({ errors: result.array() });
        }
    });
//**********************************LOGIN Requests*********************************************** */
router.get("/login",
body('Email', 'Enter a valid Email').isEmail(),
body('password', 'Entre a Valid password').exists(),
function(req,res){
    
    const result = validationResult(req);
    if(!result.isEmpty())
    {
        res.status(400).send("please enter valid Credentials");
    }

    const email=req.body.Email;
    const PassWord=req.body.password;
    //finding email in database
    User.findOne({Email:email}).then(function(user_data){
         //checking password
         hash=user_data.password;
         bcrypt.compare(PassWord,hash, function(err, r) {
            if(r==true)
            {   
                const data={
                    user:{
                        id:user_data.id
                    }
                 };
                 console.log("data found");
                var token = jwt.sign(data,JWT_SECRET);
                res.status(200).send("token="+token);
            }else
            {
                res.status(400).send("Email or password is wrong");
            }
        });
    }).catch(function(error){
        res.status(400).send("NO such user Exist");
    })

})


module.exports = router;