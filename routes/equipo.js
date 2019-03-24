var express = require("express");

var app = express();
var Equipo = require("../models/equipo");
//=======================================
//      Obtener equipos
//=======================================

app.get('/', (req, res, next) => {

    Equipo.find({}, (err, equipos) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Equipos',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            equipos: equipos
        });
    });


});

//=======================================
//      Guardar equipos
//=======================================

module.exports = app;