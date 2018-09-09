const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const invoices_schema = new mongoose.Schema({
    inv_id: Number,
    name: String,
    type_id: Number,
    data_from: String,
    data_to: String,
    price: Number,
    vat_percentage: String,
    company_name: String,
    client_name: String,
    client_phone: String,
    client_title: String,
    po_number: String,
    sub_total: Number,
    total: Number,
    note: String,
    serial : String ,
    accountant_lock: Boolean,
    account_manager_lock: Boolean,
    paid : {
        type : Boolean ,
        default : false
    },
    items: [{}],
    isDeleted: {
        type: Boolean,
        default: false
    }
},{toJSON : {virtuals: true}});

invoices_schema.virtual('invtype', {
    ref: 'Products_types',
    localField: 'type_id',
    foreignField: 'ptype_id',
    options: { select: { ptype_name: 1, _id: 0 } }
})
const Invoices = mongoose.model('Invoices', invoices_schema);
invoices_schema.plugin(AutoIncrement, { inc_field: 'inv_id' })


module.exports = Invoices ;