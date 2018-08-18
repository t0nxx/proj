
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Products_types = require('../models/prodtypes');
const Auth = require('../middlewars/auth');





router.get('/', Auth,async (req, res) => {
    const result = await Products_types
        .find();
    res.send(result);
})

router.get('/', Auth,async (req, res) => {
    const query = { ptype_id: req.body.ptype_id };
    const result = await Products_types
        .find(query);
    res.send(result);
})

router.post('/add', Auth,async (req, res) => {
    const product = new Products_types({
        ptype_name: req.body.ptype_name
    });
    try {
        await product.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/update', Auth,async (req, res) => {
    const updated = req.body;
    const query = await Products_types.findOne({ ptype_id: req.body.ptype_id });
    try {
        if (!query) return res.status(400).send('invalid prod id');
        await Products_types.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/delete', Auth,async (req, res) => {
    const query = await Products_types.findOne({ ptype_id: req.body.ptype_id });
    try {
        if (!query) return res.status(400).send('invalid prod id');
        await Products_types.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})









module.exports = router;