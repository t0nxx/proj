const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const invoices_schema = new mongoose.Schema({
    inv_id: Number ,
    name: {
        type : String ,
        required : true
    },
    type_id: {
        type : Number ,
        required : true
    },
    data_from: {
        type : String ,
        required : true
    },
    data_to: {
        type : String ,
        required : true
    },
    price: {
        type : Number ,
        required : true
    },
    vat_percentage: {
        type : String ,
        required : true
    },
    company_name: {
        type : String ,
        required : true
    },
    client_name: {
        type : String ,
        required : true
    },
    client_phone: {
        type : String ,
        required : true
    },
    po_number: {
        type : String ,
        required : true
    },
    accountant_lock: Boolean,
    account_manager_lock: Boolean,
    items: [{
        type : String ,
        required : true
    }]
});
const Invoices = mongoose.model('Invoices', invoices_schema);
invoices_schema.plugin(AutoIncrement, { inc_field: 'inv_id' })


module.exports = Invoices ;