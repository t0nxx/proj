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

router.get('/:id', Auth,async (req, res) => {
    const query = { ptype_id: req.params.id };
    const result = await Products_types
        .find(query);
    res.send(result);
})

router.post('/', Auth,async (req, res) => {
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

router.put('/:id', Auth,async (req, res) => {
    const updated = req.body;
    const query = { ptype_id: req.params.id }
    try {
        await Products_types.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', Auth,async (req, res) => {
    const query = { ptype_id: req.params.id };
    try {
        await Products_types.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})









module.exports = router;