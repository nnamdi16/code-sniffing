const express = require('express');
const Product = require('./routes/products');


module.exports = (app) => {
    app.use(express.json());
    app.use('/api', Product);
}