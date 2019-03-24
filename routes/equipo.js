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

app.post('/', (req, res) => {

    var body = req.body;
    var equipo = new Equipo({
        nombre: body.nombre
    });

    equipo.save((err, equipoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Equipo',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            equipo: equipoGuardado
        });
    });
});

module.exports = app;