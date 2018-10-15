const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const invoices_schema = new mongoose.Schema(
  {
    inv_id: Number,
    name: String,
    type_id: {
      type: Number,
      default: 0
    },
    date_from: String,
    date_to: String,
    vat_percentage: String,
    company_name: String,
    client_name: String,
    client_phone: String,
    client_title: String,
    po_number: String,
    sub_total: Number,
    total: Number,
    note: String,
    serial: String,
    created_by: Number,
    profit: Number,
    status: {
      type: String,
      default: ""
    },
    paid: {
      type: Boolean,
      default: false
    },
    items: [{}],
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { toJSON: { virtuals: true } }
);

invoices_schema.virtual("invtype", {
  ref: "Products_types",
  localField: "type_id",
  foreignField: "ptype_id",
  options: { select: { ptype_name: 1, _id: 0 } }
});

invoices_schema.virtual("createdBy", {
  ref: "Users",
  localField: "created_by",
  foreignField: "user_id",
  options: { select: { user_name: 1, _id: 0 } }
});
const Invoices = mongoose.model("Invoices", invoices_schema);
invoices_schema.plugin(AutoIncrement, { inc_field: "inv_id" });

module.exports = Invoices;
