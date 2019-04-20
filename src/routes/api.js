const express = require('express');
const route = express.Router();
const { user } = require('../controllers')
const {verificacion, verficaAdminRole} =  require('../middlewares/autenticacion');

route.get('/usuario',verificacion, user.index);

route.post('/usuario',[verificacion,verficaAdminRole], user.create)

route.put('/usuario/:id',[verificacion,verficaAdminRole], user.update)

route.delete('/usuario/:id',[verificacion,verficaAdminRole], user.delete);

module.exports = route;