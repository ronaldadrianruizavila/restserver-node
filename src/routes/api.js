const express = require('express');
const route = express.Router();
const { user,category,product,file } = require('../controllers')
const {verificacion, verficaAdminRole,verificacionUrl} =  require('../middlewares/autenticacion');

route.get('/usuario',verificacion, user.index);

route.post('/usuario',[verificacion,verficaAdminRole], user.create)

route.put('/usuario/:id',[verificacion,verficaAdminRole], user.update)

route.delete('/usuario/:id',[verificacion,verficaAdminRole], user.delete);


route.get('/categoria',verificacion, category.index);
route.get('/categoria/:id',verificacion, category.show);
route.put('/categoria/:id',verificacion, category.update);
route.delete('/categoria/:id',[verificacion], category.delete);
route.post('/categoria',[verificacion], category.store);

route.get('/producto',[verificacion],product.index);
route.get('/producto/:id',[verificacion],product.show);
route.put('/producto/:id',[verificacion],product.update);
route.delete('/producto/:id',[verificacion],product.delete);
route.post('/producto',[verificacion],product.store);

route.get('/producto/search/:termino',[verificacion],product.search);

route.put('/upload/:tipo/:id',file.upload)

route.get('/imagen/:tipo/:img',verificacionUrl,file.show)

module.exports = route;