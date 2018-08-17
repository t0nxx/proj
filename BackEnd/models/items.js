const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const items_schema = new mongoose.Schema({
    item_id: Number,
    item_name: { type : String , required :true },
    item_description: { type: String, required: true }
});
const Items = mongoose.model('Items', items_schema);
items_schema.plugin(AutoIncrement, { inc_field: 'item_id' });


module.exports = Items ;