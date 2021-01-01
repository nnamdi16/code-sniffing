const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Product = require('./routes/products');


module.exports = (app) => {
    app.use(express.json());
    app.use(cookieParser());
    //Cors support
    app.use(cors())
    app.use('/api', Product);
}