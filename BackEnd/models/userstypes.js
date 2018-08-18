<<<<<<< HEAD

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users_types_schema = new mongoose.Schema({
    utype_id: {
        type: Number ,
        required : true 
    },
    utype_name: {
        type : String ,
        required : true 
    },
    users : [{
        type : mongoose.SchemaTypes.Object ,
        ref : 'Users'
    }]
});

const Users_types = mongoose.model('Users_types', users_types_schema);
users_types_schema.plugin(AutoIncrement, { inc_field: 'utype_id' })



=======

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users_types_schema = new mongoose.Schema({
    utype_id: {
        type: Number ,
        required : true ,
    },
    utype_name: {
        type : String ,
        required : true 
    },
    users : [{
        type : mongoose.SchemaTypes.Object ,
        ref : 'Users'
    }]
});

const Users_types = mongoose.model('Users_types', users_types_schema);
users_types_schema.plugin(AutoIncrement, { inc_field: 'utype_id' })



>>>>>>> 2e070309d6437f260d7d88a4fbdb6df3b75f1c26
module.exports = Users_types ;