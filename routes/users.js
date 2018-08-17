const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Auth = require('../middlewars/auth');
require('dotenv/config');


router.get('/', Auth , async (req, res) => {
    const result = await Users
        .find();
    res.send(result);
})

router.get('/:id', Auth , async (req, res) => {
    const query = { user_id: req.params.id };
    const result = await Users
        .find(query);
    res.send(result);
})

router.post('/', Auth,async (req, res) => {
    const user = new Users({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        utype_id: req.body.utype_id
    });
    const check = await Users.findOne({email:user.email});
    try {
        if(check) return res.status(400).send("user already reg");
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password , salt);
        await user.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', Auth,async (req, res) => {
    const updated = req.body;
    const query = { user_id: req.params.id }
    try {
        await Users.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', Auth,async (req, res) => {
    const query = { user_id: req.params.id };
    try {
        await Users.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})



router.post('/login', async (req, res) => {

    try {
        const user = await Users.findOne({ email: req.body.email });
        if (!user) return res.status(400).send("wrong email");

        if (!req.body.password) return res.status(400).send("password is required")
        const valid = await bcrypt.compare(req.body.password, user.password);
        if (!valid) return res.status(400).send("wrong password");
        const token = jwt.sign({ email: user.email }, process.env.JWT_KEY, {
            expiresIn: "1h"
        });
        res.send(token);
    } catch (error) {
        res.send(error.message);
    }
})














module.exports = router;
