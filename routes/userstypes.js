const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users_types = require('../models/userstypes');


router.get('/', async (req, res) => {
    const result = await Users_types
        .find();
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const query = { utype_id: req.params.id };
    const result = await Users_types
        .find(query);
    res.send(result);
})

router.post('/', async (req, res) => {
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

router.put('/:id', async (req, res) => {
    const updated = req.body;
    const query = { utype_id: req.params.id }
    try {
        await Users_types.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', async (req, res) => {
    const query = { utype_id: req.params.id };
    try {
        await Users_types.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})











module.exports = router;