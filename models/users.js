const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users_schema = new mongoose.Schema({
    user_id: Number,
    name: String,
    email: String,
    password: String,
    utype_id: String
});

const Users = mongoose.model('Users', users_schema);
users_schema.plugin(AutoIncrement, { inc_field: 'user_id' });


module.exports = Users ;