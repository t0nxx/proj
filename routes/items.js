
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Items = require('../models/items');


router.get('/', async (req, res) => {
        const result = await Items
        .find();
        res.send(result);
})

router.get('/:id', async (req, res) => {
    const query = { item_id: req.params.id };
    const result = await Items
        .find(query);
    res.send(result);
})

router.post('/', async (req,res) =>{
    const item = new Items({
        item_name : req.body.item_name ,
        item_description : req.body.item_description
    });
    try {
        await item.save();
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id' ,async (req,res) =>{
    const updated = req.body ;
    const query = { item_id: req.params.id }
    try {
        await Items.update(query,updated);
        res.send("updated") ;
    } catch (error) {
        res.send(error.message);
    }
    
})


router.delete('/:id', async (req,res) =>{
    const query = { item_id: req.params.id };
    try {
        await Items.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})










module.exports = router;