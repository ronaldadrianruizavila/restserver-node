const express = require('express');
const server = require('./config/server');
const app = server(express());
const { port } = require('./env');
require('dotenv').config()
//conexion a base datos
require('./config/database')



app.listen(port, () => {
    console.log(`Esta en el puerto ${port}`)
});