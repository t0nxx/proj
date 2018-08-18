const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const products_types_schema = new mongoose.Schema({
    ptype_id: Number,
    ptype_name: String
});

const Products_types = mongoose.model('Products_types', products_types_schema);
products_types_schema.plugin(AutoIncrement, { inc_field: 'ptype_id' });


module.exports = Products_types ;