
const Joi = require("joi") ;
const express = require("express") ;
const cors = require('cors');
const app = express () ;
require('dotenv/config');
const mongoose = require('mongoose');

// mongoose.connect(process.env.DATA_BASE)
mongoose.connect('mongodb://localhost/ttt')
.then(() => console.log('connected to db'))
.catch(err => console.error('error', err));

const ItemsRoute = require('./routes/items') ;
const InvoicesRoute = require('./routes/invoices');
const UsersRoute = require('./routes/users');
const UsersTypeRoute = require('./routes/userstypes');
const ProductTypeRoute = require('./routes/prodtypes');
const AuthRoute = require('./routes/auth');
const LoginRoute = require('./routes/login');

app.use(express.json());
app.use(cors());
app.use('/items',   ItemsRoute ) ;
app.use('/invoices',   InvoicesRoute ) ;
app.use('/users',      UsersRoute ) ;
app.use('/userstypes',    UsersTypeRoute ) ;
app.use('/prodtypes',    ProductTypeRoute ) ;
app.use('/auth' , AuthRoute );
app.use('/login' , LoginRoute);




app.listen(3000 , () => console.log("running")) ;