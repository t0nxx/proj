const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const quotation_schema = new mongoose.Schema(
  {
    quo_id: Number,
    name: String,
    type_id: Number,
    date_from: String,
    date_to: String,
    company_name: String,
    client_name: String,
    client_phone: String,
    client_title: String,
    po_number: String,
    total: Number,
    created_by: Number,
    status: {
      type: String,
      default: "in process"
    },
    items: [{}],
    isDeleted: {
      type: Boolean,
      default: false
    }
    // seq : String
  },
  { toJSON: { virtuals: true } }
);
// , { toJSON: { virtuals: true } }
quotation_schema.virtual("createdBy", {
  ref: "Users",
  localField: "created_by",
  foreignField: "user_id",
  options: { select: { user_name: 1, _id: 0 } }
});
const Quotation = mongoose.model("Quotation", quotation_schema);
quotation_schema.plugin(AutoIncrement, { inc_field: "quo_id" });

module.exports = Quotation;
