// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');


// inicializar variables

var app = express();


// CORS

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// body parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



//importar ruta
var equipoRoutes = require('./routes/equipo');
var usuarioRoutes = require('./routes/usuario');
var clienteRoutes = require('./routes/cliente');

//Conexion a la base de datos

mongoose.connection.openUri('mongodb://localhost:27017/Examen', (err, res) => {
    if (err) throw err;
    console.log('Base de Datos: online');
});

app.use('/cliente', clienteRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/equipo', equipoRoutes);



// Escuchar peticiones

app.listen(3000, () => {
    console.log('Express Server Corriendo en 3000: online ');

});