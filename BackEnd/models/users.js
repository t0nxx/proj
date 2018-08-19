
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users_schema = new mongoose.Schema({
    user_id: Number,
    name: {
        type: String ,
        minlength : 3 ,
        maxlength : 50 ,
        required : true
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true ,
        unique : true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: true ,
    },
    utype_id: {
        type: Number ,
        required: true 
    }
});

const Users = mongoose.model('Users', users_schema);
users_schema.plugin(AutoIncrement, { inc_field: 'user_id' });


module.exports = Users ;