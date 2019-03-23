const express = require('express');
const route = express.Router();
const { user } = require('../controllers')

route.get('/', user.index);

route.get('/usuario', user.index);

route.post('/usuario', user.create)

route.put('/usuario/:id', user.update, )

module.exports = route;