<<<<<<< HEAD

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Items = require('../models/items');
const Auth = require('../middlewars/auth');



router.get('/', Auth,async (req, res) => {
        const result = await Items
        .find();
        res.send(result);
})
router.get('/count', Auth, async (req, res) => {
    const result = await Items
        .count();
    res.json(result);
})

router.get('/', Auth,async (req, res) => {
    const query = { item_id: req.body.item_id };
    const result = await Items
        .find(query);
    res.send(result);
})

router.post('/add', Auth,async (req,res) =>{
    const item = new Items({
        item_name : req.body.item_name ,
        item_description : req.body.item_description
    });
    try {
        await item.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/update', Auth,async (req,res) =>{
    const updated = req.body ;
    const query = { item_id: req.body.item_id }
    try {
        await Items.update(query,updated);
        res.send("updated") ;
    } catch (error) {
        res.send(error.message);
    }
    
})


router.delete('/delete', Auth,async (req,res) =>{
    const query = { item_id: req.body.item_id };
    try {
        await Items.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})










module.exports = router;
=======

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Items = require('../models/items');
const Auth = require('../middlewars/auth');



router.get('/', Auth,async (req, res) => {
        const result = await Items
        .find();
        res.send(result);
})
router.get('/count', Auth, async (req, res) => {
    const result = await Items
        .count();
    res.json(result);
})


router.get('/', Auth,async (req, res) => {
    const query = { item_id: req.body.item_id };
    const result = await Items
        .find(query);
    res.send(result);
})

router.post('/add', Auth,async (req,res) =>{
    const item = new Items({
        item_name : req.body.item_name ,
        item_description : req.body.item_description
    });
    try {
        await item.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/update', Auth,async (req,res) =>{
    const updated = req.body ;
    const query = { item_id: req.body.item_id }
    try {
        await Items.update(query,updated);
        res.send("updated") ;
    } catch (error) {
        res.send(error.message);
    }
    
})


router.delete('/delete', Auth,async (req,res) =>{
    const query = { item_id: req.body.item_id };
    try {
        await Items.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})










module.exports = router;
>>>>>>> 2e070309d6437f260d7d88a4fbdb6df3b75f1c26
