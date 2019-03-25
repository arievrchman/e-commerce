require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const cartsRouter = require('./routes/carts');
const productsRouter = require('./routes/products');
const transactionRouter = require('./routes/transaction');

let db_connection = process.env.DB;

if (process.env.NODE_ENV == 'test') {
  db_connection = 'mongodb://localhost/boldcommerce-test';
}

mongoose.connect(db_connection, { useNewUrlParser: true, useFindAndModify: false });
mongoose.connection.once('open', () => console.log('DB Connected')).on('error', (error) => console.log('connection error:', error));

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', cartsRouter);
app.use('/products', productsRouter);
app.use('/checkout', transactionRouter);

module.exports = app;
