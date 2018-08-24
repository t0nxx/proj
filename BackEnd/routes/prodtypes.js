
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Products_types = require('../models/prodtypes');
const Items = require('../models/items');
const Invoices = require('../models/invoices');
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

router.get('/items/:id', Auth, async (req, res) => {
    const query = { item_id: req.params.id };
    const result = await Items
        .find(query);
    res.send(result);
})
router.get('/invoices/:id', Auth, async (req, res) => {
    const query = { type_id: req.params.id };
    const result = await Invoices
        .find(query);
    res.send(result);
})

router.get('/items/count/:id', Auth, async (req, res) => {
    const query = { item_id: req.params.id };
    const result = await Items
        .count(query);
    res.json(result);
})

router.get('/invoices/count/:id', Auth, async (req, res) => {
    const query = { type_id: req.params.id };
    const result = await Invoices
        .count(query);
    res.json(result);
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
    const query = await Products_types.findOne({ ptype_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid prod id');
        await Products_types.update(query, updated);
        res.json("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', Auth,async (req, res) => {
    const query = await Products_types.findOne({ ptype_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid prod id');
        await Products_types.remove(query);
        res.json("removed");
    } catch (error) {
        res.send(error.message);
    }

})









module.exports = router;