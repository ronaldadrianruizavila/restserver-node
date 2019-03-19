const express = require('express');
const route = express.Router();
const { user } = require('../controllers')

route.get('/', user.index);

route.post('/usuario', user.create)

module.exports = route;