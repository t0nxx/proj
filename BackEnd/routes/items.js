
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Items = require('../models/items');
const Auth = require('../middlewars/auth');



router.get('/', Auth,async (req, res) => {
        const result = await Items
        .find({isDeleted : ! true});
        res.send(result);
})

router.get('/deleteditems', Auth, async (req, res) => {
    const result = await Items
        .find({ isDeleted:  true });
    res.send(result);
})
router.get('/count', Auth, async (req, res) => {
    const result = await Items
        .count({isDeleted : ! true});
    res.json(result);
})

router.get('/:id', Auth,async (req, res) => {
    const query = { item_id: req.params.id , isDeleted : !true };
    const result = await Items
        .find(query);
    res.send(result);
})

router.post('/', Auth,async (req,res) =>{
    const item = new Items({
        item_name : req.body.item_name ,
        item_description : req.body.item_description ,
        item_type : req.body.item_type
    });
    try {
        await item.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', Auth,async (req,res) =>{
    const updated = req.body ;
    const query = await Items.findOne({ item_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid item id');
        await Items.update(query,updated);
        res.json("updated") ;
    } catch (error) {
        res.send(error.message);
    }
    
})


router.delete('/:id', Auth,async (req,res) =>{
    const query = await Items.findOne({ item_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid item id');
        await Items.update(query,{isDeleted : true});
        res.json("isDeleted set to be true");
    } catch (error) {
        res.send(error.message);
    }

})



module.exports = router;
