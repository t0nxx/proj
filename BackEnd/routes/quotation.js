const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Quotation = require("../models/quotation");
const Auth = require("../middlewars/auth");

router.get("/", Auth, async (req, res) => {
  const result = await Quotation.find({ isDeleted: !true });
  res.send(result);
});

router.get("/deletedquotation", Auth, async (req, res) => {
  const result = await Quotation.find({ isDeleted: true });
  res.send(result);
});

router.get("/count", Auth, async (req, res) => {
  const result = await Quotation.count({ isDeleted: !true });
  res.json(result);
});

router.get("/:id", Auth, async (req, res) => {
  const query = { quo_id: req.params.id, isDeleted: !true };
  const result = await Quotation.find(query);
  res.send(result);
});

router.post("/", Auth, async (req, res) => {
  const quotation = new Quotation({
    name: req.body.name,
    type_id: req.body.type_id,
    date_from: req.body.data_from,
    date_to: req.body.data_to,
    company_name: req.body.company_name,
    client_name: req.body.client_name,
    client_phone: req.body.client_phone,
    client_title: req.body.client_title,
    po_number: req.body.po_number,
    total: req.body.total,
    status: req.body.status,
    items: req.body.items
  });
  try {
    await quotation.save();
    res.json("added");
  } catch (error) {
    res.send(error.message);
  }
});

router.put("/:id", Auth, async (req, res) => {
  const updated = req.body;
  const query = await Quotation.findOne({ quo_id: req.params.id });
  try {
    if (!query) return res.status(400).send("invalid quo id");
    await Quotation.update(query, updated);
    res.json("updated");
  } catch (error) {
    res.send(error.message);
  }
});

router.delete("/:id", Auth, async (req, res) => {
  const query = await Quotation.findOne({ quo_id: req.params.id });
  try {
    if (!query) return res.status(400).send("invalid quo id");
    await Quotation.update(query, { isDeleted: true });
    res.json("isDeleted set to be true");
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
