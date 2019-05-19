const route = require('../routes/api');
const express = require('express');
const morgan = require('morgan');
const login = require('../routes/login')
const path = require('path')
const fileUpload = require('express-fileupload');

module.exports = app => {

    //middleware
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morgan('dev'));
    app.use(express.static(path.join(__dirname,'../../public')))
    //routes
    app.use(fileUpload())
    app.use(route);
    app.use(login);

    return app;
}