<<<<<<< HEAD

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
        required: true ,
        ref: 'Users_types'
    }
});

const Users = mongoose.model('Users', users_schema);
users_schema.plugin(AutoIncrement, { inc_field: 'user_id' });


=======

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
        required: true ,
        ref: 'Users_types'
    }
});

const Users = mongoose.model('Users', users_schema);
users_schema.plugin(AutoIncrement, { inc_field: 'user_id' });


>>>>>>> 2e070309d6437f260d7d88a4fbdb6df3b75f1c26
module.exports = Users ;