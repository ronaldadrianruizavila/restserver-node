const mongoose = require('mongoose');
const { database } = require('../env')

let mongoAtlasDBUser = 'admin';
let mongoAtlasDBPass = 'OUBeZmfoD9A8ctkd';

mongoose.connect(database(), {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Conectado a monngoDB'))
    .catch(() => console.log('Error de conexion'));

    console.log(database())