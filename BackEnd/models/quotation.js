const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const quotation_schema = new mongoose.Schema({
    quo_id: Number,
    name: String,
    type_id: Number,
    data_from: String,
    data_to: String,
    company_name: String,
    client_name: String,
    client_phone: String,
    client_title: String,
    po_number: String,
    total: Number,
    approved  : {
        type : Boolean ,
        default : false
    },
    items: [{}],
    isDeleted: {
        type: Boolean,
        default: false
    }
    // seq : String
});
// , { toJSON: { virtuals: true } }
// invoices_schema.virtual('invtype', {
//     ref: 'Products_types',
//     localField: 'type_id',
//     foreignField: 'ptype_id',
//     options: { select: { ptype_name: 1, _id: 0 } }
// })
const Quotation = mongoose.model('Quotation', quotation_schema);
quotation_schema.plugin(AutoIncrement, { inc_field: 'quo_id' });



module.exports = Quotation ;