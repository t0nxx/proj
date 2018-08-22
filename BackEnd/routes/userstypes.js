
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users_types = require('../models/userstypes');
const Users = require('../models/users');
const Auth = require('../middlewars/auth');



router.get('/', Auth,async (req, res) => {
    const result = await Users_types
        .find();
    res.send(result);
})


router.get('/:id', Auth,async (req, res) => {
    const query = { _id: req.params.id };
    const result = await Users_types
        .find(query);
    res.send(result);
})

router.get('/count/:id', Auth, async (req, res) => {
    const query = { _id: req.params.id };
    const result = await Users
        .count(query);
    res.json(result);
})

router.post('/', Auth,async (req, res) => {
    const users_type = new Users_types({
        utype_name : req.body.utype_name ,
        utype_id : req.body.utype_id
    });
    try {
        await users_type.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', Auth,async (req, res) => {
    const updated = req.body ;
    const query = await Users_types.findOne({ _id: req.params.id });
    try {
        if(!query) return res.status(400).send('invaild utype id');
        await Users_types.update(query, updated);
        res.json("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', Auth,async (req, res) => {
    const query = await Users_types.findOne({ _id: req.params.id });
    try {
        if (!query) return res.status(400).send('invaild utype id');
        await Users_types.remove(query);
        res.json("removed");
    } catch (error) {
        res.send(error.message);
    }

})

module.exports = router;