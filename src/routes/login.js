const { Router } = require('express');
const { login } = require('../controllers')
const route = Router();

route.post('/login',login.index)


module.exports = route