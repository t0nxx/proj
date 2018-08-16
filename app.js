
const Joi = require("joi") ;
const express = require("express") ;
const app = express () ;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tests')
.then(() => console.log('connected to db'))
.catch(err => console.error('error', err));

const ItemsRoute = require('./routes/items') ;
const InvoicesRoute = require('./routes/invoices');
const UsersRoute = require('./routes/users');
const UsersTypeRoute = require('./routes/userstypes');
const ProductTypeRoute = require('./routes/prodtypes');

app.use(express.json());
app.use('/items', ItemsRoute ) ;
app.use('/invoices', InvoicesRoute ) ;
app.use('/user', UsersRoute ) ;
app.use('/userstypes', UsersTypeRoute ) ;
app.use('/prodtypes', ProductTypeRoute ) ;





app.listen(3000 , () => console.log("running")) ;
