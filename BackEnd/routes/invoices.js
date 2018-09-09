
const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Invoices = require('../models/invoices') ;
const padStart = require('string.prototype.padstart');
const schedule = require('node-schedule');
const sendmail = require('../models/mail');
const Auth = require('../middlewars/auth');

router.get('/', Auth,async (req, res) => {
    const result = await Invoices
        .find({isDeleted : !true})
        .populate('invtype');
    res.send(result);
})

router.get('/deletedinvoices', Auth, async (req, res) => {
    const result = await Invoices
        .find({isDeleted : true});
    res.send(result);
})

router.get('/count', Auth, async (req, res) => {
    const result = await Invoices
        .count({isDeleted : !true});
    res.json(result);
})

router.get('/:id', Auth,async (req, res) => {
    const query = { inv_id: req.params.id , isDeleted :!true };
    const result = await Invoices
        .find(query);
    res.send(result);
})

router.post('/', Auth,async (req, res) => {
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
        client_title : req.body.client_title,
        po_number: req.body.po_number,
        sub_total : req.body.sub_total,
        total : req.body.total,
        note : req.body.note,
        accountant_lock: req.body.accountant_lock,
        account_manager_lock: req.body.account_manager_lock,
        paid : req.body.paid,
        items: req.body.items 
    });
    try {
        await invoice.save();
        const s = invoice.inv_id;
        await Invoices.update({ inv_id: s }, {
            serial: padStart(s, 6, '0')
        });

        // for test console.log(invoice);
        // job will start every 20 sec now
        //the requirements is to be starts every week at production
        await schedule.scheduleJob('*/20 * * * * *', function () {
            if (invoice.paid != true){
            console.log('invoiced not paid');
            /// here i will set the mailler inshallah :D
               // sendmail();
            ////
            }
        });
        
        res.json("added");
    } catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', Auth,async (req, res) => {
    const updated = req.body;
    const query = await Invoices.findOne({ inv_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid inv id');
        await Invoices.update(query, updated);
        res.json("updated");
    } catch (error) {
        res.send(error.message);
    }

})


router.delete('/:id', Auth,async (req, res) => {
    const query = await Invoices.findOne({ inv_id: req.params.id });
    try {
        if (!query) return res.status(400).send('invalid inv id');
        await Invoices.update(query,{isDeleted : true});
        res.json("isDeleted set to be true");
    } catch (error) {
        res.send(error.message);
    }

})















module.exports = router ;