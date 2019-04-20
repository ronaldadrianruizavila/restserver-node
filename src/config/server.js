const route = require('../routes/api');
const express = require('express');
const morgan = require('morgan');
const login = require('../routes/login')

module.exports = app => {

    //middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morgan('dev'));

    //routes
    app.use(route);
    app.use(login);

    return app;
}