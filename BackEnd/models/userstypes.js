const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users_types_schema = new mongoose.Schema({
    utype_id: Number,
    utype_name: String,
});

const Users_types = mongoose.model('Users_types', users_types_schema);
users_types_schema.plugin(AutoIncrement, { inc_field: 'utype_id' })



module.exports = Users_types ;