const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken') ;
require('dotenv/config');




router.post('/', async (req, res) => {
    
    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("wrong email");

        if (!req.body.password) return res.status(400).send("password is required")
        const valid = await bcrypt.compare(req.body.password ,user.password);
        if (!valid) return res.status(400).send("wrong password");
        const token = jwt.sign({email : user.email}, process.env.JWT_KEY,{
            expiresIn : "1h"
        });
        res.send(token);
    } catch (error) {
        res.send(error.message);
    }
})


module.exports = router ;
