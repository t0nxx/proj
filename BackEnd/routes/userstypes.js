const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users_types = require('../models/userstypes');
const Auth = require('../middlewars/auth');



router.get('/', Auth,async (req, res) => {
    const result = await Users_types
        .find();
    res.send(result);
})

router.get('/', Auth,async (req, res) => {
    const query = { utype_id: req.body.utype_id };
    const result = await Users_types
        .find(query);
    res.send(result);
})

router.post('/add', Auth,async (req, res) => {
    const users_type = new Users_types({
        utype_name : req.body.utype_name
    });
    try {
        await users_type.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/update', Auth,async (req, res) => {
    const updated = req.body;
    const query = { utype_id: req.body.utype_id }
    try {
        await Users_types.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/delete', Auth,async (req, res) => {
    const query = { utype_id: req.body.utype_id };
    try {
        await Users_types.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})











module.exports = router;