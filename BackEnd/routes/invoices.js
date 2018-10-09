const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const pdf = require("html-pdf");
const Invoices = require("../models/invoices");
const padStart = require("string.prototype.padstart");
const schedule = require("node-schedule");
const sendmail = require("../models/mail");
const Auth = require("../middlewars/auth");
const compiled = ejs.compile(fs.readFileSync("./views/index.ejs", "utf-8"));

router.get("/", Auth, async (req, res) => {
  const result = await Invoices.find({ isDeleted: !true })
    .populate("invtype")
    .populate("createdBy");
  res.send(result);
});

router.get("/deletedinvoices", Auth, async (req, res) => {
  const result = await Invoices.find({ isDeleted: true });
  res.send(result);
});

router.get("/count", Auth, async (req, res) => {
  const result = await Invoices.count({
    isDeleted: !true
  }).populate("createdBy");
  res.json(result);
});

router.get("/:id", Auth, async (req, res) => {
  const query = { inv_id: req.params.id, isDeleted: !true };
  const result = await Invoices.find(query)
    .populate("invtype")
    .populate("createdBy");
  res.send(result);
});

router.get("/createpdf/:id", async (req, res) => {
  const query = { serial: req.params.id, isDeleted: !true };
  const result = await Invoices.find(query);
  try {
    if (result) {
      const html = compiled({ invoice: result[0] });
      const options = {
        base: "http://localhost:3000",
        width: "320mm",
        height: "445mm"
      };
      await pdf
        .create(html, options)
        .toFile("./outpdf/invoice.pdf", function(err, ress) {
          if (err) return console.log(err);
          console.log(ress);
          res.sendFile(ress.filename);
          //for testing
          // res.render("index.ejs", { invoice: result[0] });
        });
    }
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/", Auth, async (req, res) => {
  const invoice = new Invoices({
    name: req.body.name,
    type_id: req.body.type_id,
    date_from: req.body.date_from,
    date_to: req.body.date_to,
    vat_percentage: req.body.vat_percentage,
    company_name: req.body.company_name,
    client_name: req.body.client_name,
    client_phone: req.body.client_phone,
    client_title: req.body.client_title,
    po_number: req.body.po_number,
    sub_total: req.body.sub_total,
    total: req.body.total,
    note: req.body.note,
    accountant_lock: req.body.accountant_lock,
    account_manager_lock: req.body.account_manager_lock,
    paid: req.body.paid,
    items: req.body.items,
    created_by: req.body.created_by,
    profit: req.body.profit
  });
  try {
    await invoice.save();
    const s = invoice.inv_id;
    await Invoices.update(
      { inv_id: s },
      {
        serial: padStart(s, 6, "0")
      }
    );

    //schedule job here ******************
    // job will start every 20 sec now
    //the requirements is to be starts every month in production
    // await schedule.scheduleJob("* * * * 1 *", function() {
    //   if (invoice.paid != true) {
    //     console.log("invoiced not paid");
    /// here i will set the mailler inshallah :D
    // sendmail();
    ////
    //   }
    // });

    res.json("added");
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", Auth, async (req, res) => {
  const updated = req.body;
  const query = await Invoices.findOne({ inv_id: req.params.id });
  try {
    if (!query) return res.status(400).send("invalid inv id");
    await Invoices.update(query, updated);
    res.json("updated");
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", Auth, async (req, res) => {
  const query = await Invoices.findOne({ inv_id: req.params.id });
  try {
    if (!query) return res.status(400).send("invalid inv id");
    await Invoices.update(query, { isDeleted: true });
    res.json("isDeleted set to be true");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
