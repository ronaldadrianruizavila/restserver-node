const route = require('../routes/api');
const express = require('express');
const morgan = require('morgan');

module.exports = app => {

    //middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morgan('dev'));

    //routes
    app.use(route);

    return app;
}