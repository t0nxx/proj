
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const users_schema = new mongoose.Schema({
    user_id: Number,
    user_name :{
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        unique: true
    },
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
    },
    isDeleted : {
        type : Boolean ,
        default : false
    }
}, { toJSON: { virtuals: true } });
users_schema.virtual('utypename' , {
    ref : 'Users_types' ,
    localField: 'utype_id' ,
    foreignField: 'utype_id', 
    options: { select: { utype_name :1 , _id : 0 } }
});

const Users = mongoose.model('Users', users_schema);
users_schema.plugin(AutoIncrement, { inc_field: 'user_id' });


module.exports = Users ;