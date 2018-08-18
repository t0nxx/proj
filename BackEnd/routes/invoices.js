const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Invoices = require('../models/invoices') ;
const Auth = require('../middlewars/auth');




router.get('/', Auth,async (req, res) => {
    const result = await Invoices
        .find();
    res.send(result);
})

router.get('/', Auth,async (req, res) => {
    const query = { inv_id: req.body.inv_id };
    const result = await Invoices
        .find(query);
    res.send(result);
})

router.post('/add', Auth,async (req, res) => {
    const invoice = new Invoices({
        name: req.body.name,
        type_id: req.body.type_id,
        data_from: req.body.data_from,
        data_to: req.body.data_to,
        price: req.body.price,
        vat_percentage: req.body.vat_percentage,
        company_name: req.body.company_name,
        client_name: req.body.client_name,
        client_phone: req.body.client_phone,
        po_Number: req.body.po_Number,
        accountant_lock: req.body.accountant_lock,
        account_manager_lock: req.body.account_manager_lock,
        items: req.body.items 
    });
    try {
        await invoice.save();
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/update', Auth,async (req, res) => {
    const updated = req.body;
    const query = { inv_id: req.body.inv_id }
    try {
        await Invoices.update(query, updated);
        res.send("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/delete', Auth,async (req, res) => {
    const query = { inv_id: req.body.inv_id };
    try {
        await Invoices.remove(query);
        res.send("removed");
    } catch (error) {
        res.send(error.message);
    }

})














module.exports = router ;