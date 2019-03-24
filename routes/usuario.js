var express = require("express");

var app = express();
var Usuario = require("../models/usuario");

//=======================================
//      Obtener todos los  usuarios
//=======================================

app.get('/', (req, res) => {

    Usuario.find({}, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });
    });


});

//=======================================
//      Obtener usuarios por equipo
//=======================================

app.get('/:equipo', (req, res) => {

    var equipo = req.params.equipo;

    Usuario.find({ 'equipo_id': equipo }, (err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error Cargando Usuarios',
                errors: err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });
    });


});

//=======================================
//      Guardar Usuarios nuevos
//=======================================

app.post('/', (req, res) => {

    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        equipo_id: body.equipo_id
    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear Usuario',
                errors: err
            });
        }

        res.status(200).json({
            ok: true,
            equipo: usuarioGuardado
        });
    });
});

module.exports = app;