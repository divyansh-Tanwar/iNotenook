const express = require("express");
const router = express.Router();
const User = require("../models_mongoose/User");
//expess validation(for validation check(data entered by user is correct or not))
const { body, validationResult } = require('express-validator');

router.post('/',
    body('name', 'Enter a Valid name').isLength({ min: 5 }),
    body('Email', 'Enter a valid Email').isEmail(),
    body('password', 'Entre a Valid password').isLength({ min: 8 }),
    function (req, res) {
        //this will give wheather validation is successfull or not and store that in result
        console.log(req.body);
        const result = validationResult(req);
        console.log(result);
        if (result.isEmpty()) {
            const user = User(req.body);
            user.save().then(function (r, s) {
                console.log("saved successfully");
                s.send("data saved successfullly");
            }).catch(function (error) {
                console.log("Invalid entry");
                res.status(400).send(error);
            })
        }
        else {
            res.status(400).send({ errors: result.array() });
        }
    });

module.exports = router;