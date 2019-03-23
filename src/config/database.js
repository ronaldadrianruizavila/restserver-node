const mongoose = require('mongoose');
const { database } = require('../env')

mongoose.connect(database.url, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('Conectado a monngoDB'))
    .catch(() => console.log('Error de conexion'));