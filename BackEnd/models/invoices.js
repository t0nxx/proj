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
    po_Number: String,
    accountant_lock: Boolean,
    account_manager_lock: Boolean,
    items: [{}]
});
const Invoices = mongoose.model('Invoices', invoices_schema);
invoices_schema.plugin(AutoIncrement, { inc_field: 'inv_id' })


module.exports = Invoices ;