const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Users = require('../models/users');


router.get('/', async (req, res) => {
    const result = await Users
        .find();
    res.send(result);
})

router.get('/:id', async (req, res) => {
    const query = { user_id: req.params.id };
    const result = await Users
        .find(query);
    res.send(result);
})

router.post('/', async (req, res) => {
    const user = new Users({
        name: String,
        email: req.body.email,
        password: req.body.password,
        utype_id: req.body.utype_id
    });
    try {
        await user.save();
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', async (req, res) => {
    const updated = req.body;
    const query = { user_id: req.params.id }
    try {
        await User.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', async (req, res) => {
    const query = { user_id: req.params.id };
    try {
        await User.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})











module.exports = router;