
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const Users_types = require('../models/userstypes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv/config');

router.post('/', async (req, res) => {

    try {
        const user = await Users.findOne({ user_name: req.body.user_name });
        const utype = await Users_types.findOne({utype_id : user.utype_id});
        if (!user) return res.status(400).send("wrong user name");

        if (!req.body.password) return res.status(400).send("password is required")
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(400).send("wrong password");
        const token = jwt.sign({ user_name: user.user_name }, process.env.JWT_KEY, {
           // expiresIn: "1h"
        });

        res.send({
            user_name : user.user_name ,
            name: user.name,
            email: user.email,
            utype_id: user.utype_id,
            utype_name : utype.utype_name,
            token: token
        });

    } catch (error) {
        res.send(error.message);
    }

})



module.exports = router;
