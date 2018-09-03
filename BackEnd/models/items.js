const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const items_schema = new mongoose.Schema({
    item_id: Number,
    item_name: { type : String , required :true },
    item_description: { type: String, required: true },
    item_type : {type : Number , required : true},
    isDeleted: {
        type: Boolean,
        default: false
    } 
}, { toJSON: { virtuals: true } });

items_schema.virtual('itemtype' , {
    ref: 'Products_types' ,
    localField :'item_type' ,
    foreignField: 'ptype_id' ,
    options: { select: { ptype_name : 1 , _id : 0 }}
})
const Items = mongoose.model('Items', items_schema);
items_schema.plugin(AutoIncrement, { inc_field: 'item_id' });


module.exports = Items ;